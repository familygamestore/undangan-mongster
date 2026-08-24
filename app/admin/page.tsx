'use client';
import { FormEvent, useState } from 'react';

function slugify(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function AdminPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const link = slug ? `${origin}/invite/${slug}` : '';

  function generate(e: FormEvent) { e.preventDefault(); const s = slugify(name); if (!s) { setError('Enter a valid community or team name.'); return; } setError(''); setSlug(s); setCopied(false); }
  async function copy() { if (!link) return; await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  function whatsapp() { if (!link) return; const msg = `🔥 MONGSTER OFFICIAL INVITATION\n\nHalo ${name.trim().toUpperCase()}!\n\nMONGSTER secara resmi mengundang kalian untuk menghadiri event Mobile Legends kami.\n\nBuka undangan:\n${link}\n\n— MONGSTER`; window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer'); }

  return <main className="admin-page shell">
    <div className="topbar"><a href="/" className="wordmark">MONGSTER</a><span>INVITATION GENERATOR</span></div>
    <section className="admin-grid">
      <div className="admin-intro"><div className="eyebrow">ADMIN / INVITATION STUDIO</div><h1>Create a <span>grand invitation.</span></h1><p className="muted">Create a grand invitation for your next MLBB battle. One community name is all you need.</p><div className="mini-stats"><span>NO DATABASE</span><span>DYNAMIC ROUTE</span><span>VERCEL READY</span></div></div>
      <form className="generator-card" onSubmit={generate}>
        <label htmlFor="community">COMMUNITY / TEAM NAME</label>
        <input id="community" value={name} onChange={e => setName(e.target.value)} placeholder="Enter community or team..." autoComplete="off" />
        {error && <p className="error">{error}</p>}
        <button className="button primary full" type="submit">GENERATE INVITATION <span>→</span></button>
        {slug && <div className="result-card"><div className="result-label">INVITATION CREATED</div><strong>{name.trim().toUpperCase()}</strong><div className="link-box">{link}</div><div className="actions"><button type="button" className="button secondary" onClick={copy}>{copied ? 'LINK COPIED' : 'COPY LINK'}</button><a className="button ghost" href={`/invite/${slug}`}>OPEN INVITATION</a><button type="button" className="button whatsapp" onClick={whatsapp}>SHARE WHATSAPP</button></div></div>}
      </form>
    </section>
  </main>;
}
