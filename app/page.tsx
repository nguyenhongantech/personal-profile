"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Award,
  GraduationCap,
  Mic,
  Newspaper,
  ArrowRight,
  Edit3,
  Save,
  Moon,
  Sun
} from "lucide-react";
import { link } from "fs";
import { label } from "framer-motion/client";

/**
 * Next.js single-file profile site for scholarship/CV showcase
 * - Paste into app/page.tsx (App Router) or pages/index.tsx (Pages Router)
 * - Tailwind recommended
 * - Quick edit: click "Edit Content" → modify JSON → Save (stored in localStorage)
 */

const DEFAULT_CONTENT = {
  name: "Nguyen Thanh Yen My",
  headline:
    "MBA Scholarship Candidate | Amazon Strategic Account Manager | Business & E-commerce Growth Specialist",
  contact: {
    phone: "+84 70 758 6662",
    email: "yenmynguyenthanh@gmail.com",
    location: "Ho Chi Minh City, Viet Nam",
    links: []
  },
  about: {
    greeting: "Hi, I’m My Nguyen",
    text: [
      "A passionate business leader with nearly 11 years of experience in B2B strategy, digital platforms, supply chain, and global e-commerce.",
      "My journey spans global corporations and fast-scaling international startups — combining corporate rigor with entrepreneurial agility.",
      "Highlights include contributions at two world-class companies: Amazon (Big 5 tech) and UPS (Fortune 500 logistics)."
    ],
  },
  careerHighlights: {
    title: "Career Highlights",
    items: [
      {
        org: "Amazon Global Selling Vietnam",
        role: "Strategic Account Manager (Present)",
        bullets: [
          "Manage key accounts; grow Vietnamese sellers globally",
          "3× Country Star of the Month",
          "Certified Amazon Advertising Trainer",
          "Lead B2B initiatives: connect international buyers with Vietnamese manufacturers",
          "Consult SMEs on cross-border strategy and brand positioning"
        ]
      },
      {
        org: "UPS Vietnam",
        role: "Account Executive",
        bullets: [
          "Supported global trade expansion via UPS logistics network",
          "Top Performance Award for acquisition & growth"
        ]
      },
      {
        org: "International Startups",
        role: "Market Expansion & Regional Management",
        bullets: [
          "RedDoorz – Business Development Manager: opened & scaled local markets; led 4–6 BDs",
          "VNTravel (Mytour.vn) – Market Manager: strategic hotel partnerships; data-driven growth"
        ]
      }
    ]
  },
  // Speaking engagements and media coverage
  speaking: {
    title: "Speaking & Public Engagements",
    items: [
      {
        event: "VIEE 2025 – Vietnam International Electronics Industry Expo",
        note: "International-scale event"
      },
      { event: "From Local to Global", note: "UEF & JCI hosted" },
      { event: "Amazon Education Programs", note: "Training Vietnamese SMEs" },
      { event: "National workshops & conferences", note: "Covered by top media" }
    ],
    media: [
      { label: "HCMCPV.org.vn", href: "https://hcmcpv.org.vn/tin-tuc/day-manh-xuat-khau-hang-hoa-viet-nam-ra-thi-truong-quoc-te-1491923499" },
      { label: "Vietnam News Agency", href: "https://vnanet.vn/vi/anh/anh-thoi-su-trong-nuoc-1014/day-manh-xuat-khau-hang-hoa-ra-thi-truong-quoc-te-thong-qua-he-thong-thuong-mai-dien-tu-7418815.html" },
      { label: "VnEconomy", href: "https://vneconomy.vn/xuat-khau-do-go-tro-lai-quy-dao-tang-truong.htm" },
      { label: "HAWA", href: "https://hawa.vn/thuong-mai-dien-tu-chia-khoa-hoan-thien-chuoi-cung-ung/" },
      { label: "Vietstock", href: "https://vietstock.vn/2024/12/ban-noi-ngoai-that-go-vao-my-o-viet-nam-da-la-mot-loi-the-768-1253451.htm" },
      { label: "Nông Nghiệp VN", href: "https://nongnghiepmoitruong.vn/co-hoi-xuat-khau-go-noi-that-qua-thuong-mai-dien-tu-xuyen-bien-gioi-d378070.html" },
      { label: "Báo Đầu Tư", href: "https://baodautu.vn/gia-tang-kim-ngach-xuat-khau-cho-hang-thu-cong-my-nghe-d229672.html#:~:text=Nguy%E1%BB%85n%20Thanh%20Y%E1%BA%BFn%20My%2C" },
      { label: "HCMC Government Portal", href: "https://hochiminhcity.gov.vn/vi/web/hcm/w/thuong-mai-ien-tu-xuyen-bien-gioi-co-hoi-tang-truong-toan-cau-cho-san-pham-go-noi-that-viet-nam#:~:text=B%C3%A0%20Nguy%E1%BB%85n%20Thanh%20Y%E1%BA%BFn%20My%20chia%20s%E1%BA%BB%20th%C3%B4ng%20tin%20v%E1%BB%81%20ti%E1%BB%81m%20n%C4%83ng%20th%C6%B0%C6%A1ng%20m%E1%BA%A1i%20%C4%91i%E1%BB%87n%20t%E1%BB%AD%20xuy%C3%AAn%20bi%C3%AAn%20gi%E1%BB%9Bi%20tr%C3%AAn%20Amazon" }
    ]
  },
  education: {
    title: "Education & Certifications",
    items: [
      { name: "BA in Business English", org: "Van Lang University" },
      {
        name: "Import–Export & Customs Regulations Certification",
        org: "National Economics University"
      },
      {
        name: "Marketing Manager Certification",
        org: "Marcom Vietnam School & University of Economics HCMC"
      },
      { name: "Amazon Advertising Trainer Certification", org: "Amazon" },
      { name: "Sales Leadership Program", org: "Nora Academy" }
    ],
    galleryNote: "Additional certifications to be included visually (as portfolio)"
  },
  awards: {
    title: "Awards & Recognitions",
    items: [
      "3× Country Star of the Month – Amazon",
      "16 internal achievement awards – Amazon",
      "Top Performance Award – UPS",
      "Best Team Player – VNTravel",
      "Winner – RedDoorz Amazing Race (Leadership & Performance)",
      "Recognized speaker/trainer – national & academic events"
    ]
  },
  masters: {
    title: "Why the Master’s in Management & Digital Business?",
    intro:
      "This program is the next logical step to integrate corporate & startup experience with advanced management and digital strategy.",
    bullets: [
      "Strengthen academic foundation in digital management & strategic leadership",
      "Bridge practical experience (Amazon, UPS, startups) with theory",
      "Enrich the classroom with real-world case studies and cross-border insights"
    ]
  },
  vision: {
    title: "Vision Beyond Graduation",
    phases: [
      {
        label: "Short-Term",
        text:
          "Help Vietnamese SMEs refine and optimize cross-border e‑commerce strategies"
      },
      {
        label: "Mid-Term",
        text:
          "Partner with universities, policymakers, and associations to deliver capacity-building programs"
      },
      {
        label: "Long-Term",
        text:
          "Serve as a speaker, mentor, and alumni ambassador to grow Vietnam’s digital trade ecosystem"
      }
    ]
  },
  // Optional: add photos here via the editor (array of {src, alt})
  gallery: [
    // Example placeholders – replace with your own URLs
    // { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61", alt: "Speaking at conference" },
    // { src: "https://images.unsplash.com/photo-1485217988980-11786ced9454", alt: "Workshop training" },
  ]
};

function useLocalContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("my_profile_content_v1");
      if (raw) setContent(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (next: typeof DEFAULT_CONTENT) => {
    setContent(next);
    try {
      localStorage.setItem("my_profile_content_v1", JSON.stringify(next));
    } catch {}
  };
  return [content, save] as const;
}

function Section({ title, icon, children, wow }: any) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 print:py-6">
      {wow ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
            {icon}
            {title}
          </h2>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>
      ) : (
        <div className="flex items-center gap-3 mb-5">
          {icon}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
      )}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Pill({ children }: any) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full border text-xs sm:text-sm">
      {children}
    </span>
  );
}

// Helper: build a reasonable media link from a label
function buildMediaHref(label: string): string {
  try {
    // if looks like a url, return as-is
    if (/^https?:\/\//i.test(label)) return label;
    // if it looks like a domain, search site:
    if (/\./.test(label) && !/\s/.test(label)) {
      const domain = label.replace(/^[^A-Za-z0-9]+|\/$/g, "");
      return `https://www.google.com/search?q=site:${encodeURIComponent(domain)}+%22Nguyen+Thanh+Yen+My%22`;
    }
    // generic search
    return `https://www.google.com/search?q=${encodeURIComponent(label + " Nguyen Thanh Yen My")}`;
  } catch {
    return "#";
  }
}

export default function ProfileSite() {
  const [data, saveData] = useLocalContent();
  const [dark, setDark] = useState(true);

  // Simple smoke tests to help catch content regressions in dev
  useEffect(() => {
    console.assert(!!data.name, "[TEST] name should exist");
    console.assert(Array.isArray(data.about.text), "[TEST] about.text is array");
    console.assert(Array.isArray(data.speaking.items), "[TEST] speaking.items is array");
  }, [data]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const Header = useMemo(() => (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-fuchsia-600/10 to-emerald-500/10 dark:from-indigo-600/30 dark:via-fuchsia-600/20 dark:to-emerald-500/20 print:hidden"/>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              {data.name}
            </motion.h1>
            <p className="mt-3 text-base sm:text-lg opacity-90 max-w-3xl">{data.headline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill><Phone className="w-4 h-4 mr-2"/>{data.contact.phone}</Pill>
              <Pill><Mail className="w-4 h-4 mr-2"/>{data.contact.email}</Pill>
              {data.contact.location && <Pill>{data.contact.location}</Pill>}
            </div>
          </div>
          <div className="flex items-center gap-2 z-10 print:hidden">
            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              <span>{dark ? "Light" : "Dark"} mode</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Newspaper className="w-4 h-4"/>
              <span>Print / PDF</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  ), [data, dark]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-emerald-300/60 dark:selection:bg-emerald-400/30">
      {Header}

      <style jsx global>{`
        @page { margin: 14mm; }
        @media print {
          html, body { background: #fff !important; }
          a { color: #000 !important; text-decoration: underline; }
          .prose { color: #000 !important; }
          header { margin-bottom: 12mm; }
          h1, h2, h3 { break-after: avoid; }
          section { break-inside: avoid; }
        }
      `}</style>

      {/* About */}
      <Section title="About Me" icon={<ArrowRight className="w-6 h-6"/>} wow>
        <p className="text-lg font-medium">{data.about.greeting}</p>
        {data.about.text.map((t: string, i: number) => (
          <p key={i}>{t}</p>
        ))}
      </Section>

      {/* Career Highlights */}
      <Section title={data.careerHighlights?.title} icon={<Award className="w-6 h-6"/>}>
        <ul className="list-disc pl-5 space-y-1">
          {data.careerHighlights.items.map((item: any, i: number) => (
            <li key={i}>
              <strong>{item.org}</strong> - {item.role}
              <ul className="list-disc pl-5 space-y-1">
                {item.bullets.map((bullet: string, j: number) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* Speaking */}
      <Section title={data.speaking.title} icon={<Mic className="w-6 h-6"/>} wow>
        <div className="mt-6 space-y-4">
          {data.speaking.items.map((s: any, i: number) => (
            <div key={i} className="relative pl-6">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-indigo-500" />
              <p className="text-base sm:text-lg font-medium leading-snug">
                {s.event}{s.note ? ` (${s.note})` : ''}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <p className="text-sm opacity-80 mb-2 font-medium">Media Coverage</p>
          <p className="text-sm leading-relaxed">
            {data.speaking.media.map((m: any, i: number) => {
              const label = typeof m === 'string' ? m : (m.label || m.name || 'Link');
              const href = typeof m === 'string' ? buildMediaHref(m) : (m.href || m.url || '#');
              return (
                <span key={i}>
                  <a className="underline underline-offset-2 hover:opacity-80" href={href} target="_blank" rel="noreferrer">{label}</a>
                  {i < data.speaking.media.length - 1 ? ' • ' : ''}
                </span>
              );
            })}
          </p>
        </div>
      </Section>

      {/* Education */}
      <Section title={data.education.title} icon={<GraduationCap className="w-6 h-6"/>}>
        <ul className="grid sm:grid-cols-2 gap-4">
          {data.education.items.map((e: any, i: number) => (
            <li key={i} className="rounded-xl border p-4">
              <p className="font-medium">{e.name}</p>
              <p className="text-sm opacity-80">{e.org}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm opacity-80">{data.education.galleryNote}</p>
      </Section>

      {/* Awards */}
      <Section title={data.awards.title} icon={<Award className="w-6 h-6"/>}>
        <ul className="grid sm:grid-cols-2 gap-4">
          {data.awards.items.map((a: string, i: number) => (
            <li key={i} className="rounded-xl border p-4">{a}</li>
          ))}
        </ul>
      </Section>

      {/* Master's Motivation */}
      <Section title={data.masters.title} icon={<GraduationCap className="w-6 h-6"/>}>
        <p className="mb-3">{data.masters.intro}</p>
        <ul className="list-disc pl-5 space-y-1">
          {data.masters.bullets.map((b: string, i: number) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </Section>

      {/* Vision */}
      <Section title={data.vision.title} icon={<Award className="w-6 h-6"/>}>
        <div className="grid md:grid-cols-3 gap-4">
          {data.vision.phases.map((p: any, i: number) => (
            <div key={i} className="rounded-2xl border p-5">
              <p className="text-sm opacity-70">{p.label}</p>
              <p className="font-medium mt-1">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section title="Photo Gallery" icon={<Award className="w-6 h-6"/>} wow>
        {(!data.gallery || data.gallery.length === 0) ? (
          <div className="rounded-xl border p-5 text-sm opacity-80">
            <p>Add photos by clicking <strong>Edit Content</strong> and inserting:</p>
            <pre className="mt-2 bg-neutral-950/5 dark:bg-neutral-50/5 p-3 rounded-lg overflow-auto text-xs">{`"gallery": [
  { "src": "https://.../photo1.jpg", "alt": "Speaking at ..." },
  { "src": "https://.../photo2.jpg", "alt": "Workshop" }
]`}</pre>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.gallery.map((img: any, i: number) => (
              <figure key={i} className="overflow-hidden rounded-2xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt || "photo"} className="w-full h-44 object-cover" />
                {img.alt && <figcaption className="p-2 text-xs opacity-80">{img.alt}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* Footer / Call-to-Action */}
      <footer className="border-t py-8 mt-10 bg-neutral-50/50 dark:bg-neutral-900/30 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Let’s connect</p>
            <p className="opacity-80 text-sm">Open to scholarships, speaking, and collaboration opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${data.contact.email}`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><Mail className="w-4 h-4"/>Email</a>
            <a href={`tel:${data.contact.phone}`} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><Phone className="w-4 h-4"/>Call</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
