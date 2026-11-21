import test from 'node:test';import assert from 'node:assert/strict';import {assessRelease} from './index.js';
test('accepts complete evidence',()=>assert.deepEqual(assessRelease({tests:true,security:true,review:true}),{ready:true,missing:[]}));
test('rejects missing evidence',()=>assert.deepEqual(assessRelease({tests:true}),{ready:false,missing:['security','review']}));
test('rejects false evidence',()=>assert.equal(assessRelease({tests:true,security:false,review:true}).ready,false));
test('rejects absent object',()=>assert.equal(assessRelease(null).ready,false));
