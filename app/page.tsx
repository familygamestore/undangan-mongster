import Link from 'next/link';

export default function Home() {
  return <main className="landing shell">
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <section className="landing-card">
      <div className="eyebrow">MONGSTER / MLBB COMMUNITY & ESPORTS</div>
      <div className="brand-mark">M</div>
      <h1>MONGSTER</h1>
      <p className="hero-sub">GRAND MLBB INVITATION</p>
      <p className="muted max-copy">Create exclusive invitations for the communities joining MONGSTER events.</p>
      <Link className="button primary" href="/admin">CREATE INVITATION <span>↗</span></Link>
    </section>
  </main>;
}
