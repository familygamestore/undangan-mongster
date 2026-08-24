 "use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

const eventName = process.env.NEXT_PUBLIC_EVENT_NAME || "MONGSTER MLBB COMMUNITY CUP";
const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE || "2026-08-29T19:30:00+07:00";
const dateLabel = process.env.NEXT_PUBLIC_EVENT_DATE_LABEL || "29 AUGUST 2026";
const eventTime = process.env.NEXT_PUBLIC_EVENT_TIME || "19:30 WIB";
const eventFormat = process.env.NEXT_PUBLIC_EVENT_FORMAT || "5 VS 5";
const matchFormat = process.env.NEXT_PUBLIC_MATCH_FORMAT || "BO1 / BO3";
const prizePool = process.env.NEXT_PUBLIC_PRIZE_POOL || "Rp1.000.000";
const slots = process.env.NEXT_PUBLIC_TOTAL_SLOTS || "16 TEAMS";
const adminWa = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "628xxxxxxxxxx";

function prettySlug(slug: string) {
  return decodeURIComponent(slug).split("-").filter(Boolean).join(" ").toUpperCase();
}

export default function Invitation({ params }: { params: { slug: string } }) {
  const [opened, setOpened] = useState(false);
  const [now, setNow] = useState(Date.now());
  const community = useMemo(() => prettySlug(params.slug), [params.slug]);

  useEffect(() => {
    if (!params.slug) notFound();
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [params.slug]);

  const diff = Math.max(0, new Date(eventDate).getTime() - now);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const status = diff === 0 ? "EVENT IS LIVE / HAS ENDED" : "EVENT STARTS IN";

  const waMessage = `Halo Admin MONGSTER, saya dari ${community}. Saya ingin menanyakan mengenai undangan MONGSTER MLBB COMMUNITY CUP.`;
  const waUrl = `https://wa.me/${adminWa.replace(/\D/g, "")}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="invite-page">
      <div className={`opening ${opened ? "hidden" : ""}`}>
        <div className="opening-inner">
          <div className="display opening-logo gradient-text">MONGSTER</div>
          <div className="opening-step">PRESENTS</div>
          <div className="opening-step">AN EXCLUSIVE INVITATION</div>
          <button className="btn btn-primary" onClick={() => setOpened(true)}>OPEN INVITATION</button>
        </div>
      </div>

      <header className="container header">
        <a className="brand" href="/"><span className="brand-mark">M</span><span>MONGSTER</span></a>
        <span className="eyebrow">Official invitation</span>
      </header>

      <section className="invite-hero grid-bg">
        <div className="hero-image-bg" aria-hidden="true" />
        <div className="container invite-hero-inner">
          <div>
            <div className="invite-kicker">MONGSTER · OFFICIAL INVITATION</div>
            <h1 className="display invite-title">YOU ARE<br/><span className="gradient-text">INVITED</span></h1>
            <div className="display community">{community}</div>
            <div className="event-name">{eventName}</div>
            <div className="actions">
              <a className="btn btn-primary" href="#event">VIEW EVENT</a>
              <a className="btn btn-ghost" href={waUrl} target="_blank" rel="noreferrer">CHAT MONGSTER ADMIN</a>
            </div>
          </div>
          <div className="poster-frame glass">
            <div className="poster">
              <img src="/assets/event/event-poster.webp" alt={`${eventName} event poster`} onError={(e) => {e.currentTarget.style.display="none"}} />
              <div className="poster-placeholder"><strong>MONGSTER<br/>MLBB COMMUNITY CUP</strong><span>EVENT POSTER</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="event" className="section">
        <div className="container">
          <div className="eyebrow">THE BATTLE AWAITS</div>
          <h2 className="display section-title">EVENT INFORMATION</h2>
          <div className="cards">
            <div className="info-card glass"><small>EVENT</small><strong>{eventName}</strong></div>
            <div className="info-card glass"><small>DATE</small><strong>{dateLabel}</strong></div>
            <div className="info-card glass"><small>TIME</small><strong>{eventTime}</strong></div>
            <div className="info-card glass"><small>FORMAT</small><strong>{eventFormat}</strong></div>
            <div className="info-card glass"><small>MATCH</small><strong>{matchFormat}</strong></div>
            <div className="info-card glass"><small>SLOTS</small><strong>{slots}</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prize">
            <div className="eyebrow">TOTAL PRIZE POOL</div>
            <div className="prize-value">{prizePool}</div>
            <div className="muted">Compete. Connect. Create the moment.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">COMPETITIVE FORMAT</div>
          <h2 className="display section-title">THE ROAD TO GLORY</h2>
          <div className="timeline">
            {["QUALIFIER","PLAYOFF","SEMIFINAL","GRAND FINAL"].map((item) => <div className="step glass" key={item}><strong className="display" style={{fontSize:28}}>{item}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">{status}</div>
          <h2 className="display section-title">COUNTDOWN</h2>
          <div className="countdown">
            <div className="time glass"><strong>{String(days).padStart(2,"0")}</strong><span>DAYS</span></div>
            <div className="time glass"><strong>{String(hours).padStart(2,"0")}</strong><span>HOURS</span></div>
            <div className="time glass"><strong>{String(minutes).padStart(2,"0")}</strong><span>MINUTES</span></div>
            <div className="time glass"><strong>{String(secs).padStart(2,"0")}</strong><span>SECONDS</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta glass">
            <div><div className="eyebrow">NEED MORE INFORMATION?</div><h2 className="display" style={{fontSize:48,margin:"8px 0"}}>TALK TO MONGSTER</h2><p className="muted">Have questions about your invitation or the event?</p></div>
            <a className="btn btn-primary" href={waUrl} target="_blank" rel="noreferrer">CHAT MONGSTER ADMIN</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="brand"><span className="brand-mark">M</span><span>MONGSTER</span></div>
          <p>MLBB COMMUNITY & ESPORTS</p>
          <p>Creating competitive moments. Building communities.</p>
          <div className="socials">
            <a href={process.env.NEXT_PUBLIC_INSTAGRAM || "#"}>INSTAGRAM</a>
            <a href={process.env.NEXT_PUBLIC_TIKTOK || "#"}>TIKTOK</a>
            <a href={process.env.NEXT_PUBLIC_YOUTUBE || "#"}>YOUTUBE</a>
            <a href={process.env.NEXT_PUBLIC_DISCORD || "#"}>DISCORD</a>
            <a href={waUrl}>WHATSAPP</a>
          </div>
        </div>
      </footer>
      <a className="wa" href={waUrl} target="_blank" rel="noreferrer" aria-label="Chat MONGSTER Admin on WhatsApp">WA</a>
    </main>
  );
}