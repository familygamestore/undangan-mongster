import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export type InviteData = {
  community: string; eventName: string; date: string; time: string;
  format: string; match: string; prize: string; slots: string;
  venue: string; description: string; whatsapp: string;
  instagram: string; tiktok: string; youtube: string; discord: string; facebook: string;
};

function slugify(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.community !== 'string' || !body.community.trim()) {
    return NextResponse.json({ error: 'Nama komunitas wajib diisi.' }, { status: 400 });
  }
  const slug = slugify(body.community);
  if (!slug) {
    return NextResponse.json({ error: 'Nama komunitas tidak valid.' }, { status: 400 });
  }
  const data: InviteData = {
    community: String(body.community || '').trim(),
    eventName: String(body.eventName || '').trim(),
    date: String(body.date || '').trim(),
    time: String(body.time || '').trim(),
    format: String(body.format || '').trim(),
    match: String(body.match || '').trim(),
    prize: String(body.prize || '').trim(),
    slots: String(body.slots || '').trim(),
    venue: String(body.venue || '').trim(),
    description: String(body.description || '').trim(),
    whatsapp: String(body.whatsapp || '').trim(),
    instagram: String(body.instagram || '').trim(),
    tiktok: String(body.tiktok || '').trim(),
    youtube: String(body.youtube || '').trim(),
    discord: String(body.discord || '').trim(),
    facebook: String(body.facebook || '').trim(),
  };
  try {
    await redis.set(`invite:${slug}`, data);
  } catch (err) {
    return NextResponse.json({ error: 'Gagal menyimpan undangan. Pastikan Vercel KV sudah terhubung ke project ini.' }, { status: 500 });
  }
  return NextResponse.json({ slug, data });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Slug wajib diisi.' }, { status: 400 });
  try {
    const data = await redis.get<InviteData>(`invite:${slug}`);
    if (!data) return NextResponse.json({ error: 'Undangan tidak ditemukan.' }, { status: 404 });
    return NextResponse.json({ slug, data });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengambil undangan. Pastikan Vercel KV sudah terhubung ke project ini.' }, { status: 500 });
  }
}
