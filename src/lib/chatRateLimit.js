import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 30;

const memoryHits = new Map();
let distributedRatelimit = null;

function pruneMemoryHits() {
  const now = Date.now();
  for (const [key, entry] of memoryHits.entries()) {
    if (now - entry.start > WINDOW_MS) memoryHits.delete(key);
  }
}

function checkRateLimitMemory(key) {
  pruneMemoryHits();
  const now = Date.now();
  const id = key || 'anonymous';
  const entry = memoryHits.get(id);

  if (!entry || now - entry.start > WINDOW_MS) {
    memoryHits.set(id, { start: now, count: 1 });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - entry.start) };
  }

  entry.count += 1;
  return { allowed: true };
}

function getDistributedRatelimit() {
  if (distributedRatelimit) return distributedRatelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) return null;

  distributedRatelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1 h'),
    prefix: 'portfolio-chat',
  });

  return distributedRatelimit;
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'anonymous';
}

/**
 * Rate limit chat requests. Uses Upstash Redis when configured (serverless-safe);
 * falls back to in-memory only for local development.
 */
export async function checkRateLimit(key) {
  const ratelimit = getDistributedRatelimit();

  if (ratelimit) {
    const { success, reset } = await ratelimit.limit(key || 'anonymous');
    if (!success) {
      return { allowed: false, retryAfterMs: Math.max(0, reset - Date.now()) };
    }
    return { allowed: true };
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[chat] UPSTASH_REDIS_REST_URL/TOKEN not set — rate limiting is per-instance only on serverless.',
    );
  }

  return checkRateLimitMemory(key);
}
