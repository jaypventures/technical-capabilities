import test from 'node:test';import assert from 'node:assert/strict';import {createHmac} from 'node:crypto';import {verifyEvent} from './index.js';
const timestamp=1700000000000,secret='synthetic-secret',payload='{"event":"example"}';const signature=createHmac('sha256',secret).update(timestamp+'.'+payload).digest('hex');
test('accepts correctly signed event',()=>assert.equal(verifyEvent({payload,signature,secret,timestamp,now:timestamp}),true));
test('rejects tampering',()=>assert.equal(verifyEvent({payload:payload+'x',signature,secret,timestamp,now:timestamp}),false));
test('rejects stale event',()=>assert.equal(verifyEvent({payload,signature,secret,timestamp,now:timestamp+400000}),false));
test('rejects malformed signature',()=>assert.equal(verifyEvent({payload,signature:'bad',secret,timestamp,now:timestamp}),false));
