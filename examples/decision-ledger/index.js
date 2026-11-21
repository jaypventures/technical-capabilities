import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Synthetic, single-process demonstration of a tamper-evident decision log.
 * This is NOT a distributed audit system, append-only database, or signature service.
 */
const stable = value => JSON.stringify(value);
const digest = value => createHash('sha256').update(value).digest('hex');

export function appendDecision(history, {actor, action, evidence, approved}, secret) {
  if (!Array.isArray(history) || !history.every(x => x && typeof x.hash === 'string')) throw Error('Invalid history');
  if (typeof actor !== 'string' || !actor.trim() || typeof action !== 'string' || !action.trim()) throw Error('Missing actor or action');
  if (!Array.isArray(evidence) || !evidence.length || evidence.some(x => typeof x !== 'string' || !x.trim())) throw Error('Evidence references required');
  if (approved !== true && approved !== false) throw Error('Explicit decision required');
  if (typeof secret !== 'string' || secret.length < 16) throw Error('Demo secret must be at least 16 characters');
  if (!verifyHistory(history, secret)) throw Error('History integrity failed');
  const entry = {sequence:history.length + 1,actor,action,evidence,approved,previousHash:history.at(-1)?.hash ?? null};
  const hash = digest(stable(entry));
  const mac = createHmac('sha256',secret).update(hash).digest('hex');
  return [...history, {...entry,hash,mac}];
}

export function verifyHistory(history, secret) {
  if (!Array.isArray(history) || typeof secret !== 'string' || !secret) return false;
  let previousHash = null;
  for (let i=0;i<history.length;i++) {
    const item = history[i];
    if (!item || item.sequence !== i+1 || item.previousHash !== previousHash) return false;
    const {hash,mac,...entry} = item;
    if (typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash) || typeof mac !== 'string' || !/^[a-f0-9]{64}$/.test(mac)) return false;
    const expectedHash = digest(stable(entry));
    const expectedMac = createHmac('sha256',secret).update(expectedHash).digest();
    if (!timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(expectedHash,'hex'))) return false;
    if (!timingSafeEqual(Buffer.from(mac,'hex'),expectedMac)) return false;
    previousHash = hash;
  }
  return true;
}
