import Link from "next/link";

export default function Home() {
  return (
    <main className="page-bg grid-bg">
      <div className="container header">
        <div className="brand"><span className="brand-mark">M</span><span>MONGSTER</span></div>
        <Link className="btn btn-ghost" href="/admin">ADMIN</Link>
      </div>
      <section className="hero-home">
        <div className="container">
          <div className="home-copy">
            <div className="eyebrow">Official esports invitation system</div>
            <h1 className="display gradient-text">Grand MLBB<br/>Invitation</h1>
            <p>Create exclusive invitations for the communities joining MONGSTER events. Generate a clean, shareable invitation link in seconds — no database required.</p>
            <div className="actions">
              <Link className="btn btn-primary" href="/admin">CREATE INVITATION →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}