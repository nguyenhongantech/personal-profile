import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import fs from "fs";
import path from "path";

const PASSWORD = process.env.ADMIN_PASSWORD || "";

// Load gallery data from local file
function loadGallery(): any[] {
  try {
    const galleryPath = path.join(process.cwd(), "app", "gallery.json");
    if (fs.existsSync(galleryPath)) {
      const galleryData = fs.readFileSync(galleryPath, "utf-8");
      return JSON.parse(galleryData);
    }
  } catch (error) {
    console.warn("Could not load gallery.json:", error);
  }
  return [];
}

// read content JSON from Blob if token exists, else return 404 to indicate fallback
async function readFromBlob(): Promise<any | null> {
  try {
    if (!process.env.VERCEL_BLOB_READ_WRITE_TOKEN) return null;
    const { blobs } = await list({ prefix: "content/profile.json" });
    const hit = blobs.find(b => b.pathname === "content/profile.json");
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET() {
  const data = await readFromBlob();
  const gallery = loadGallery();
  
  if (!data) {
    // Fall back: tell client to use localStorage content but provide gallery
    return NextResponse.json({ _fallback: true, gallery }, { status: 200 });
  }
  
  // Merge gallery data with profile data
  return NextResponse.json({ ...data, gallery });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body?.action === "login") {
    if (!PASSWORD || body?.password !== PASSWORD) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "1", { httpOnly: true, path: "/" });
    return res;
  }
  return new NextResponse("Bad Request", { status: 400 });
}

export async function PUT(req: NextRequest) {
  // auth check
  const cookie = req.cookies.get("admin_auth");
  if (!cookie || cookie.value !== "1") {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!process.env.VERCEL_BLOB_READ_WRITE_TOKEN) {
    return new NextResponse("Blob token not configured", { status: 412 });
  }
  const json = await req.json();
  // Overwrite JSON at a deterministic path so front-end can read it back
  await put("content/profile.json", JSON.stringify(json, null, 2), {
    contentType: "application/json",
    access: "public",
    addRandomSuffix: false,
  });
  return NextResponse.json({ ok: true });
}
