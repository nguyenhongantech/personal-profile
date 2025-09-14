"use client";

import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // attempt to fetch to see if cookie is already set
    (async () => {
      try {
        const res = await fetch("/api/content", { method: "GET" });
        if (res.status === 200) {
          const data = await res.json();
          setJsonText(JSON.stringify(data, null, 2));
          setAuthed(true);
        }
      } catch {}
    })();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, action: "login" })
      });
      if (res.ok) {
        // after login, fetch content
        const contentRes = await fetch("/api/content");
        const data = await contentRes.json();
        setJsonText(JSON.stringify(data, null, 2));
        setAuthed(true);
        setMessage("Logged in.");
      } else {
        setMessage("Wrong password");
      }
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setLoading(true);
    setMessage(null);
    try {
      const parsed = JSON.parse(jsonText);
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed)
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage("Saved!");
    } catch (e: any) {
      setMessage("Save failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Edit Content</h1>

      {!authed ? (
        <form onSubmit={login} className="space-x-2">
          <input
            className="border rounded px-3 py-2"
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <button
            className="border rounded px-3 py-2"
            disabled={loading}
          >{loading ? "..." : "Login"}</button>
          {message && <p className="text-sm mt-2 opacity-80">{message}</p>}
        </form>
      ) : (
        <div className="space-y-3">
          <textarea
            className="w-full h-[70vh] font-mono text-sm border rounded p-3"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="border rounded px-3 py-2" onClick={save} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            {message && <p className="text-sm mt-2 opacity-80">{message}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
