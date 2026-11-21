import test from 'node:test';import assert from 'node:assert/strict';import {transition,applyEvent} from './index.js';
test('accepts permitted transition',()=>assert.equal(transition('draft','review'),'review'));
test('rejects invalid transition',()=>assert.throws(()=>transition('draft','published'),/Invalid/));
test('handles duplicate event without repeating transition',()=>{const a=applyEvent({state:'draft',processed:[]},{id:'e1',next:'review'});assert.deepEqual(applyEvent(a,{id:'e1',next:'published'}),a)});
test('rejects unknown state',()=>assert.throws(()=>transition('missing','review'),/Unknown/));
