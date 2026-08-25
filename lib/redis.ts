import Redis from 'ioredis';

// Mencoba beberapa kemungkinan nama env variable, supaya cocok dengan
// hasil integrasi Redis Cloud maupun Upstash di Vercel Marketplace.
function resolveUrl() {
  return (
    process.env.UPSTASH_REDIS_REST_REDIS_URL ||
    process.env.REDIS_URL ||
    process.env.KV_URL ||
    ''
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __redisClient: Redis | undefined;
}

function getClient(): Redis {
  if (global.__redisClient) return global.__redisClient;
  const url = resolveUrl();
  if (!url) {
    throw new Error('Env variable Redis (URL koneksi) tidak ditemukan. Cek nama variable di Vercel Settings > Environment Variables.');
  }
  const client = new Redis(url, { maxRetriesPerRequest: 3, lazyConnect: true });
  global.__redisClient = client;
  return client;
}

export async function redisSetJSON(key: string, value: unknown) {
  const client = getClient();
  await client.set(key, JSON.stringify(value));
}

export async function redisGetJSON<T>(key: string): Promise<T | null> {
  const client = getClient();
  const raw = await client.get(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
