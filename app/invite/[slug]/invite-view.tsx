'use client';

import { useEffect, useMemo, useState } from 'react';
import type { InviteData } from '../../api/invite/route';

function niceDate(v: string) { if (!v) return 'TBA'; const d = new Date(v + 'T00:00:00'); return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(); }
function phone(v: string) { return v.replace(/\D/g, ''); }
function safeUrl(v: string) { return /^https?:\/\//i.test(v) ? v : '#'; }

export default function InviteView({ data, slug, notFound }: { data: InviteData; slug: string; notFound: boolean }) {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setTimeout(() => setOpen(true), 350);
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => { clearTimeout(t); clearInterval(i); };
  }, []);

  const target = new Date(`${data.date}T${data.time || '00:00'}:00+07:00`).getTime();
  const diff = now !== null ? target - now : null;
  const countdown = useMemo(() => diff === null ? { d: 0, h: 0, m: 0, s: 0 } : {
    d: Math.max(0, Math.floor(diff / 86400000)),
    h: Math.max(0, Math.floor(diff / 3600000) % 24),
    m: Math.max(0, Math.floor(diff / 60000) % 60),
    s: Math.max(0, Math.floor(diff / 1000) % 60),
  }, [diff]);
  const status = diff === null ? 'MEMUAT...' : diff > 0 ? 'COUNTDOWN MENUJU MAIN' : (now! < target + 6 * 3600000 ? 'EVENT SEDANG BERLANGSUNG' : 'EVENT TELAH SELESAI');

  const wa = phone(data.whatsapp);
  const joinText = `🔥 EVENT MONGSTER — KONFIRMASI\n\nHalo Admin MONGSTER,\nKami dari ${data.community.toUpperCase()} menyatakan SIAP HADIR untuk ${data.eventName}.\n\nJadwal: ${niceDate(data.date)} • ${data.time} WIB\n\nTerima kasih.`;
  const chatText = `Halo Admin MONGSTER, saya dari ${data.community.toUpperCase()}. Saya ingin bertanya tentang ${data.eventName}.`;
  const join = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(joinText)}` : `https://wa.me/?text=${encodeURIComponent(joinText)}`;
  const chat = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(chatText)}` : `https://wa.me/?text=${encodeURIComponent(chatText)}`;
  const socials = [['Instagram', data.instagram, '◎'], ['TikTok', data.tiktok, '♪'], ['YouTube', data.youtube, '▶'], ['Discord', data.discord, '◈'], ['Facebook', data.facebook, 'f']].filter(x => x[1]);

  if (notFound) {
    return <main className="not-found"><div><b className="not-logo">M</b><h1>INVITATION NOT FOUND</h1><p>Link ini belum pernah dibuat, sudah kedaluwarsa, atau salah ketik.</p><a className="button primary" href="/">BACK TO EVENT MONGSTER</a></div></main>;
  }

  return <main className={`public-event ${open ? 'is-open' : ''}`}>
    {!open && <div className="invite-cover"><div className="cover-inner"><div className="eyebrow">EVENT MONGSTER</div><div className="cover-mark">M</div><small>OFFICIAL COMMUNITY INVITATION</small><h2>YOU ARE<br /><em>INVITED.</em></h2><button className="button primary" onClick={() => setOpen(true)}>BUKA UNDANGAN ↗</button></div></div>}
    <div className="noise" /><div className="glow glow1" /><div className="glow glow2" />
    <header className="public-nav shell"><a href="/" className="brand"><span>M</span><b>MONGSTER</b></a><div><small>OFFICIAL</small><strong>EVENT INVITATION</strong></div></header>
    <section className="public-hero shell">
      <div className="hero-main"><div className="eyebrow">EVENT MONGSTER • OFFICIAL INVITATION</div><div className="hero-mini">UNTUK KOMUNITAS / TAMENG</div><h1>{data.community.toUpperCase()}</h1><p>{data.description}</p><div className="hero-actions"><a href={join} target="_blank" rel="noreferrer" className="button primary">KONFIRMASI HADIR ↗</a><a href="#schedule" className="button dark">LIHAT JADWAL ↓</a></div></div>
      <div className="hero-poster"><div className="poster-tag">MONGSTER<br />EVENT</div><div className="poster-inner"><div className="poster-m">M</div><small>YOU ARE INVITED</small><h2>{data.community.toUpperCase()}</h2><div className="poster-rule" /><b>{data.eventName}</b><p>{niceDate(data.date)} • {data.time} WIB</p><strong>EVENT MONGSTER</strong></div></div>
    </section>

    <section id="schedule" className="schedule shell">
      <div className="section-kicker"><span>01</span><div><b>JADWAL MAIN</b><small>Pastikan squad kamu siap tepat waktu.</small></div></div>
      <div className="schedule-card"><div className="date-block"><small>MAIN PADA</small><b>{niceDate(data.date)}</b><strong>{data.time}<i> WIB</i></strong></div><div className="schedule-divider" /><div className="event-title"><small>{data.venue}</small><h2>{data.eventName}</h2><p>Jadwal resmi undangan EVENT MONGSTER untuk <b>{data.community}</b>.</p></div></div>
      <div className="facts">{[['FORMAT', data.format], ['MATCH', data.match], ['HADIAH', data.prize], ['SLOT', data.slots]].map(([a, b]) => <div key={a}><small>{a}</small><b>{b}</b></div>)}</div>
    </section>

    <section className="count shell"><div className="count-head"><div><div className="eyebrow">{status}</div><h2>Ready when<br /><em>the clock hits zero.</em></h2></div><a href={chat} target="_blank" rel="noreferrer" className="button dark">CHAT ADMIN ↗</a></div>
      {diff !== null && diff > 0 ? <div className="timer">{[['d', 'HARI'], ['h', 'JAM'], ['m', 'MENIT'], ['s', 'DETIK']].map(([k, l]) => <div key={k}><b>{String((countdown as any)[k]).padStart(2, '0')}</b><small>{l}</small></div>)}</div> : <div className="live-state">● {status}</div>}
    </section>

    <section className="message-section shell"><div className="message-number">02</div><div><div className="eyebrow">KHUSUS UNTUK KAMU</div><h2>{data.community.toUpperCase()}</h2><p>{data.description}</p><div className="signature">EVENT MONGSTER <span>×</span> COMMUNITY</div></div></section>

    <section className="join-card shell"><div><div className="eyebrow">YOUR SQUAD. YOUR MOMENT.</div><h2>SIAP BERMAIN<br /><em>BERSAMA MONGSTER?</em></h2></div><a href={join} target="_blank" rel="noreferrer" className="button primary">KONFIRMASI HADIR ↗</a></section>

    <footer className="public-footer shell"><div className="footer-brand"><a href="/" className="brand"><span>M</span><b>MONGSTER</b></a><p>EVENT MONGSTER untuk komunitas, tameng, dan tim Mobile Legends.</p><small>CREATING COMPETITIVE MOMENTS.<br />BUILDING COMMUNITIES.</small></div><div className="social-area"><div className="eyebrow">FOLLOW / CONTACT</div><div className="social-grid">{socials.length ? socials.map(([name, url, icon]) => <a key={name} href={safeUrl(url as string)} target="_blank" rel="noreferrer"><i>{icon}</i>{name}<span>↗</span></a>) : <a href={chat} target="_blank" rel="noreferrer"><i>✆</i>WhatsApp Admin<span>↗</span></a>}</div></div></footer>
    <a className="floating-chat" href={chat} target="_blank" rel="noreferrer" aria-label="Chat admin">✆</a>
  </main>;
}
