 "use client";

import { useState } from "react";
import Link from "next/link";

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().toLowerCase().replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const generate = () => {
    const slug = slugify(name);
    if (!slug) return;
    setLink(`${window.location.origin}/invite/${slug}`);
  };

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
  };

  const whatsapp = () => {
    if (!link) return;
    const community = name.trim();
    const text = `🔥 MONGSTER OFFICIAL INVITATION

Halo ${community}!

MONGSTER secara resmi mengundang kalian untuk menghadiri event Mobile Legends kami.

Buka undangan:
${link}

— MONGSTER`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page-bg grid-bg admin-shell">
      <div className="container header">
        <Link className="brand" href="/"><span className="brand-mark">M</span><span>MONGSTER</span></Link>
        <span className="eyebrow">Invitation Generator</span>
      </div>
      <div className="container admin-main">
        <section className="panel glass">
          <div className="eyebrow">MONGSTER INVITATION GENERATOR</div>
          <h1 className="display">Create a grand invitation.</h1>
          <p className="muted">Enter a community or team name. The invitation is generated directly from the URL — no database required.</p>
          <label className="form-label" htmlFor="community">COMMUNITY / TEAM NAME</label>
          <input id="community" className="input" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()} placeholder="Enter community or team name..." />
          <div className="actions">
            <button className="btn btn-primary" onClick={generate} disabled={!name.trim()}>GENERATE INVITATION</button>
          </div>
          {link && (
            <div className="result">
              <div className="result-label">INVITATION CREATED</div>
              <h2 className="display" style={{fontSize:36, margin:"8px 0"}}>{name.trim().toUpperCase()}</h2>
              <div className="result-label">INVITATION LINK</div>
              <div className="link-box">{link}</div>
              <div className="actions">
                <button className="btn btn-primary" onClick={copy}>COPY LINK</button>
                <Link className="btn btn-ghost" href={`/invite/${slugify(name)}`}>OPEN INVITATION</Link>
                <button className="btn btn-ghost" onClick={whatsapp}>SHARE WHATSAPP</button>
              </div>
            </div>
          )}
        </section>
        <aside className="panel glass">
          <div className="eyebrow">FAST WORKFLOW</div>
          <div className="feature-list">
            <div className="feature"><strong>01 — ENTER NAME</strong><span>Example: HIGHEST LORD</span></div>
            <div className="feature"><strong>02 — GENERATE</strong><span>Creates /invite/highest-lord automatically.</span></div>
            <div className="feature"><strong>03 — SHARE</strong><span>Copy the link or send it through WhatsApp.</span></div>
            <div className="feature"><strong>NO DATABASE</strong><span>The recipient name is derived directly from the URL slug.</span></div>
          </div>
        </aside>
      </div>
    </main>
  );
}