import { Redis } from '@upstash/redis';
import type { Metadata } from 'next';
import InviteView from './invite-view';
import type { InviteData } from '../../api/invite/route';

const redis = Redis.fromEnv();

export const dynamic = 'force-dynamic';

const defaults: InviteData = {
  community:'MONGSTER COMMUNITY',eventName:'MONGSTER COMMUNITY BATTLE',date:'2026-08-28',time:'19:30',
  format:'5 VS 5',match:'BO1 / BO3',prize:'Rp1.000.000',slots:'16 TEAMS',venue:'Online • Mobile Legends',
  description:'Siapkan squad terbaikmu dan hadir sebagai bagian dari EVENT MONGSTER.',
  whatsapp:'',instagram:'',tiktok:'',youtube:'',discord:'',facebook:''
};

function display(slug: string) {
  return slug.split('-').filter(Boolean).map(x => x[0]?.toUpperCase() + x.slice(1)).join(' ');
}

async function getInvite(slug: string): Promise<InviteData | null> {
  try {
    const data = await redis.get<InviteData>(`invite:${slug}`);
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInvite(slug);
  const community = data?.community || display(slug);
  return {
    title: `${community.toUpperCase()} — UNDANGAN EVENT MONGSTER`,
    description: data?.description || defaults.description,
  };
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stored = await getInvite(slug);
  const data: InviteData = stored ?? { ...defaults, community: display(slug) };
  const notFound = !stored;
  return <InviteView data={data} slug={slug} notFound={notFound} />;
}
