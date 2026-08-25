import Link from 'next/link';

export default function Home(){
 return <main className="home">
  <div className="home-grid"/><div className="home-glow a"/><div className="home-glow b"/>
  <header className="home-nav shell"><a className="brand" href="/"><span>M</span><b>MONGSTER</b></a><small>COMMUNITY × ESPORTS × EVENTS</small></header>
  <section className="home-hero shell">
   <div className="eyebrow">EVENT MONGSTER / COMMUNITY INVITATION SYSTEM</div>
   <h1>ONE EVENT.<br/><em>EVERY COMMUNITY.</em></h1>
   <p>Buat undangan resmi untuk setiap komunitas, tameng, atau tim. Atur <b>jadwal main, format, hadiah, kontak, dan social media</b> lalu bagikan link-nya.</p>
   <div className="home-actions"><Link className="button primary" href="/admin">BUAT UNDANGAN ↗</Link><a className="button dark" href="#how">CARA KERJA ↓</a></div>
   <div className="home-tags"><span>01 / SETUP EVENT</span><span>02 / GENERATE LINK</span><span>03 / SHARE</span></div>
  </section>
  <section id="how" className="home-features shell">
   {[
    ['01','JADWAL MAIN','Atur tanggal dan jam pertandingan langsung dari Event Studio.'],
    ['02','LINK PER KOMUNITAS','Setiap komunitas atau tameng mendapatkan link undangan sendiri.'],
    ['03','SOCIAL MEDIA','Instagram, TikTok, YouTube, Discord, Facebook dan WhatsApp tampil rapi.'],
    ['04','RESPONSIVE','Dibuat mobile-first agar nyaman dibuka dari HP, iPhone, iPad maupun desktop.']
   ].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
  </section>
  <footer className="home-footer shell"><span>EVENT MONGSTER</span><span>FOR EVERY COMMUNITY • TAMENG • TEAM</span></footer>
 </main>
}
