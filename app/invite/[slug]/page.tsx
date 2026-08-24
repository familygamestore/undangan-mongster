'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

const cfg = {
  eventName: process.env.NEXT_PUBLIC_EVENT_NAME || 'MONGSTER CHALLENGE TOURNAMENT',
  eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || '2026-08-28T19:30:00+07:00',
  eventDateLabel: process.env.NEXT_PUBLIC_EVENT_DATE_LABEL || '28 AUGUST 2026',
  eventTime: process.env.NEXT_PUBLIC_EVENT_TIME || '19:30 WIB',
  format: process.env.NEXT_PUBLIC_EVENT_FORMAT || '5 VS 5',
  match: process.env.NEXT_PUBLIC_MATCH_FORMAT || 'BO1 / BO3',
  prize: process.env.NEXT_PUBLIC_PRIZE_POOL || 'Rp1.000.000',
  slots: process.env.NEXT_PUBLIC_TOTAL_SLOTS || '16 TEAMS',
  adminWa: process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || ''
};
function display(slug: string) { return slug.split('-').filter(Boolean).map(x => x.charAt(0).toUpperCase()+x.slice(1)).join(' '); }

export default function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState(''); const [opened, setOpened] = useState(false); const [now, setNow] = useState(Date.now());
  useEffect(() => { params.then(p => setSlug(p.slug)); }, [params]);
  useEffect(() => { const t=setTimeout(()=>setOpened(true), 250); const i=setInterval(()=>setNow(Date.now()),1000); return ()=>{clearTimeout(t);clearInterval(i)}; },[]);
  const community = useMemo(()=>display(slug),[slug]);
  const target = new Date(cfg.eventDate).getTime();
  const diff = target-now;
  const days=Math.max(0,Math.floor(diff/86400000)); const hours=Math.max(0,Math.floor(diff/3600000)%24); const mins=Math.max(0,Math.floor(diff/60000)%60); const secs=Math.max(0,Math.floor(diff/1000)%60);
  const status = diff>0 ? 'EVENT STARTS IN' : now < target + 6*3600000 ? 'EVENT IS LIVE' : 'EVENT HAS ENDED';
  const talk = cfg.adminWa ? `https://wa.me/${cfg.adminWa.replace(/\D/g,'')}?text=${encodeURIComponent(`Halo Admin MONGSTER, saya dari ${community.toUpperCase()}. Saya ingin menanyakan mengenai undangan MONGSTER CHALLENGE TOURNAMENT.`)}` : `https://wa.me/?text=${encodeURIComponent(`Halo Admin MONGSTER, saya dari ${community.toUpperCase()}. Saya ingin menanyakan mengenai undangan MONGSTER CHALLENGE TOURNAMENT.`)}`;
  const joinMsg = `🔥 KONFIRMASI KEHADIRAN\n\nHalo Admin MONGSTER,\n\nKami atas nama komunitas/tim *${community.toUpperCase()}* dengan ini menyatakan SIAP HADIR dan mengikuti ${cfg.eventName}.\n\nMohon dicatat sebagai peserta resmi. Terima kasih 🙏\n\n— ${community.toUpperCase()}`;
  const join = cfg.adminWa ? `https://wa.me/${cfg.adminWa.replace(/\D/g,'')}?text=${encodeURIComponent(joinMsg)}` : `https://wa.me/?text=${encodeURIComponent(joinMsg)}`;
  if (!slug) return <main className="not-found shell"><div><div className="brand-mark">M</div><h1>INVITATION NOT FOUND</h1><a href="/" className="button primary">BACK TO MONGSTER</a></div></main>;
  return <main className={`invite ${opened?'opened':''}`}>
    {!opened && <div className="opening"><div className="opening-inner"><div className="eyebrow">MONGSTER</div><div className="opening-title">PRESENTS</div><div className="opening-sub">AN EXCLUSIVE INVITATION</div><button className="button primary" onClick={()=>setOpened(true)}>OPEN INVITATION</button></div></div>}
    <div className="grid-bg"/><header className="invite-header"><a href="/" className="wordmark">MONGSTER</a><span>OFFICIAL INVITATION</span></header>
    <section className="invite-hero shell">
      <div className="hero-copy"><div className="eyebrow">OFFICIAL INVITATION</div><p className="kicker">YOU ARE INVITED</p><h1>{community.toUpperCase()}</h1><p className="lead">Dengan bangga, MONGSTER mengundang <strong>{community.toUpperCase()}</strong> untuk menjadi bagian dari event Mobile Legends yang kami selenggarakan.</p><div className="hero-actions"><a href={join} target="_blank" rel="noreferrer" className="button whatsapp">IKUT EVENT <span>↗</span></a><a href="#event" className="button ghost">VIEW EVENT <span>↓</span></a></div></div>
      <div className="poster-wrap"><div className="poster-glow"/><div className="poster"><Image src="/assets/event/event-poster.webp" alt="MONGSTER Challenge Tournament event poster" fill sizes="(max-width: 700px) 88vw, 520px" style={{objectFit:'contain'}} priority onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/assets/event/event-poster.svg'}} /></div></div>
    </section>
    <section id="event" className="event-section shell"><div className="section-head"><div><div className="eyebrow">THE BATTLE AWAITS</div><h2>{cfg.eventName}</h2></div><div className="date-chip">{cfg.eventDateLabel}</div></div><div className="info-grid"><div className="info-card"><span>DATE</span><b>{cfg.eventDateLabel}</b></div><div className="info-card"><span>TIME</span><b>{cfg.eventTime}</b></div><div className="info-card"><span>FORMAT</span><b>{cfg.format}</b></div><div className="info-card"><span>MATCH</span><b>{cfg.match}</b></div><div className="info-card"><span>PRIZE POOL</span><b>{cfg.prize}</b></div><div className="info-card"><span>SLOTS</span><b>{cfg.slots}</b></div></div></section>
    <section className="countdown shell"><div><div className="eyebrow">{status}</div><div className="timer">{status==='EVENT STARTS IN' ? <><span>{String(days).padStart(2,'0')}<small>DAYS</small></span><span>{String(hours).padStart(2,'0')}<small>HOURS</small></span><span>{String(mins).padStart(2,'0')}<small>MINUTES</small></span><span>{String(secs).padStart(2,'0')}<small>SECONDS</small></span></> : <strong>{status}</strong>}</div></div></section>
    <section className="message shell"><div className="quote-line"/><div><div className="eyebrow">THIS INVITATION IS FOR</div><h2>{community.toUpperCase()}</h2><p>Ready your squad. Bring your best game. MONGSTER is building competitive moments and unforgettable communities.</p></div></section>
    <section className="cta shell"><div><div className="eyebrow">READY TO BATTLE?</div><h2>JOIN AS {community.toUpperCase()}</h2></div><div className="cta-actions"><a className="button whatsapp" href={join} target="_blank" rel="noreferrer">IKUT EVENT ↗</a><a className="button secondary" href={talk} target="_blank" rel="noreferrer">CHAT ADMIN</a></div></section>
    <footer className="footer shell"><div><div className="wordmark">MONGSTER</div><p>MLBB COMMUNITY & ESPORTS</p><small>Creating competitive moments.<br/>Building communities.</small></div><div className="socials"><a className="social-btn ig" href={process.env.NEXT_PUBLIC_INSTAGRAM || '#'} target="_blank" rel="noreferrer">Instagram</a><a className="social-btn tiktok" href={process.env.NEXT_PUBLIC_TIKTOK || '#'} target="_blank" rel="noreferrer">TikTok</a><a className="social-btn youtube" href={process.env.NEXT_PUBLIC_YOUTUBE || '#'} target="_blank" rel="noreferrer">YouTube</a><a className="social-btn discord" href={process.env.NEXT_PUBLIC_DISCORD || '#'} target="_blank" rel="noreferrer">Discord</a><a className="social-btn wa" href={process.env.NEXT_PUBLIC_WHATSAPP || '#'} target="_blank" rel="noreferrer">WhatsApp</a></div></footer>
    <a className="floating-wa" href={talk} target="_blank" rel="noreferrer" aria-label="Chat MONGSTER Admin">✆</a>
  </main>;
}
