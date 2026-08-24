'use client';

import { FormEvent, useMemo, useState } from 'react';

function slugify(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function enc(v: string) { return encodeURIComponent(v.trim()); }

export default function AdminPage() {
  const [form, setForm] = useState({
    community:'', eventName:'MONGSTER COMMUNITY BATTLE', date:'2026-08-28', time:'19:30',
    format:'5 VS 5', match:'BO1 / BO3', prize:'Rp1.000.000', slots:'16 TEAMS',
    venue:'Online • Mobile Legends', description:'Siapkan squad terbaikmu dan hadir sebagai bagian dari EVENT MONGSTER.',
    whatsapp:'', instagram:'', tiktok:'', youtube:'', discord:'', facebook:''
  });
  const [link,setLink]=useState(''); const [copied,setCopied]=useState(false); const [error,setError]=useState('');
  const set=(key:string,value:string)=>setForm(p=>({...p,[key]:value}));
  const generated = useMemo(()=>link ? link : '',[link]);

  function generate(e:FormEvent) {
    e.preventDefault();
    const slug=slugify(form.community);
    if(!slug){setError('Masukkan nama komunitas atau tim.');return;}
    setError('');
    const q=new URLSearchParams();
    Object.entries(form).forEach(([k,v])=>{if(v.trim()) q.set(k,v.trim())});
    const origin=typeof window!=='undefined'?window.location.origin:'';
    setLink(`${origin}/invite/${slug}?${q.toString()}`);
    setCopied(false);
  }
  async function copy(){ if(!generated)return; await navigator.clipboard.writeText(generated); setCopied(true); setTimeout(()=>setCopied(false),1600); }
  function shareWA(){
    if(!generated)return;
    const msg=`🔥 EVENT MONGSTER — UNDANGAN RESMI\n\n${form.community.toUpperCase()}\n${form.eventName}\n📅 ${form.date} • ${form.time} WIB\n\nBuka undangan:\n${generated}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');
  }
  function reset(){setLink('');setCopied(false);setError('');}

  return <main className="studio">
    <header className="studio-nav">
      <a href="/" className="brand"><span>M</span><b>MONGSTER</b></a>
      <div className="nav-meta"><span>EVENT STUDIO</span><i/> <span>NO DATABASE • VERCEL READY</span></div>
    </header>

    <section className="studio-head shell">
      <div>
        <div className="eyebrow">EVENT MONGSTER / INVITATION BUILDER</div>
        <h1>Buat <em>undangan event</em><br/>untuk setiap komunitas.</h1>
        <p>Atur jadwal main, format pertandingan, hadiah, kontak, dan seluruh social media. Satu komunitas = satu link undangan yang siap dibagikan.</p>
      </div>
      <div className="head-badge"><strong>01</strong><span>SETUP<br/>EVENT</span></div>
    </section>

    <section className="builder shell">
      <form className="builder-form" onSubmit={generate}>
        <div className="form-section">
          <div className="form-title"><span>01</span><div><b>IDENTITAS</b><small>Siapa yang kamu undang?</small></div></div>
          <div className="fields one"><Field label="NAMA KOMUNITAS / TAMENG" value={form.community} onChange={v=>set('community',v)} placeholder="Contoh: Family Game Store"/></div>
          <div className="fields two">
            <Field label="NAMA EVENT" value={form.eventName} onChange={v=>set('eventName',v)} placeholder="MONGSTER COMMUNITY BATTLE"/>
            <Field label="VENUE / KETERANGAN" value={form.venue} onChange={v=>set('venue',v)} placeholder="Online • Mobile Legends"/>
          </div>
          <label className="field"><span>TEKS UNDANGAN</span><textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={4}/></label>
        </div>

        <div className="form-section">
          <div className="form-title"><span>02</span><div><b>JADWAL MAIN</b><small>Tentukan waktu pertandingan</small></div></div>
          <div className="fields two">
            <label className="field"><span>TANGGAL</span><input type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></label>
            <label className="field"><span>JAM MAIN (WIB)</span><input type="time" value={form.time} onChange={e=>set('time',e.target.value)}/></label>
          </div>
          <div className="fields four">
            <Field label="FORMAT" value={form.format} onChange={v=>set('format',v)} placeholder="5 VS 5"/>
            <Field label="MATCH" value={form.match} onChange={v=>set('match',v)} placeholder="BO1 / BO3"/>
            <Field label="HADIAH" value={form.prize} onChange={v=>set('prize',v)} placeholder="Rp1.000.000"/>
            <Field label="SLOT" value={form.slots} onChange={v=>set('slots',v)} placeholder="16 TEAMS"/>
          </div>
        </div>

        <div className="form-section">
          <div className="form-title"><span>03</span><div><b>SOCIAL MEDIA</b><small>Link yang muncul di undangan</small></div></div>
          <div className="fields two">
            <Field label="WHATSAPP ADMIN" value={form.whatsapp} onChange={v=>set('whatsapp',v)} placeholder="628xxxxxxxxxx"/>
            <Field label="INSTAGRAM" value={form.instagram} onChange={v=>set('instagram',v)} placeholder="https://instagram.com/..."/>
            <Field label="TIKTOK" value={form.tiktok} onChange={v=>set('tiktok',v)} placeholder="https://tiktok.com/@..."/>
            <Field label="YOUTUBE" value={form.youtube} onChange={v=>set('youtube',v)} placeholder="https://youtube.com/..."/>
            <Field label="DISCORD" value={form.discord} onChange={v=>set('discord',v)} placeholder="https://discord.gg/..."/>
            <Field label="FACEBOOK" value={form.facebook} onChange={v=>set('facebook',v)} placeholder="https://facebook.com/..."/>
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}
        <button className="generate" type="submit"><span>GENERATE INVITATION LINK</span><strong>↗</strong></button>
      </form>

      <aside className="preview-panel">
        <div className="preview-top"><span>LIVE LINK</span><b>EVENT MONGSTER</b></div>
        <div className="preview-art">
          <div className="scan"/><div className="preview-mark">M</div>
          <div className="preview-event">OFFICIAL<br/>INVITATION</div>
          <h2>{(form.community||'YOUR COMMUNITY').toUpperCase()}</h2>
          <div className="preview-line"/>
          <p>{form.eventName}</p>
          <div className="preview-date">{form.date || 'DATE'} <i/> {form.time || '19:30'} WIB</div>
        </div>
        <div className="result">
          {generated ? <><small>LINK SIAP DIBAGIKAN</small><div className="generated-link">{generated}</div><div className="result-actions"><button type="button" onClick={copy}>{copied?'COPIED ✓':'COPY LINK'}</button><a href={generated} target="_blank">OPEN ↗</a><button type="button" onClick={shareWA}>WHATSAPP</button><button type="button" className="muted-btn" onClick={reset}>RESET</button></div></> :
          <div className="empty-result"><span>LINK PREVIEW</span><p>Isi data di kiri lalu tekan<br/><b>Generate Invitation Link</b>.</p></div>}
        </div>
      </aside>
    </section>
    <footer className="studio-foot shell"><span>EVENT MONGSTER</span><span>BUILT FOR EVERY COMMUNITY • TAMENG • TEAM</span></footer>
  </main>;
}

function Field({label,value,onChange,placeholder}:{label:string,value:string,onChange:(v:string)=>void,placeholder?:string}) {
  return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;
}
