// Per-instance only: Vercel cold starts and multiple instances do not share this map.
const requests = new Map<string, { count: number; expires: number }>();
export function allowRequest(key: string, now = Date.now()): boolean {
  for (const [id, value] of requests)
    if (value.expires <= now) requests.delete(id);
  const record = requests.get(key);
  if (record) {
    if (record.count >= 5) return false;
    record.count++;
    requests.delete(key);
    requests.set(key, record);
    return true;
  }
  if (requests.size >= 10000) {
    const oldest = requests.keys().next().value;
    if (oldest) requests.delete(oldest);
  }
  requests.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
  return true;
}
