import { createHmac, timingSafeEqual } from 'node:crypto';
export function verifyEvent({payload,signature,secret,timestamp,now=Date.now(),maxAgeMs=300000}) {
  if (typeof payload!=='string'||typeof secret!=='string'||!secret||typeof signature!=='string'||!Number.isFinite(timestamp)) return false;
  if (Math.abs(now-timestamp)>maxAgeMs) return false;
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected=createHmac('sha256',secret).update(String(timestamp)+'.'+payload).digest();
  return timingSafeEqual(expected,Buffer.from(signature,'hex'));
}
