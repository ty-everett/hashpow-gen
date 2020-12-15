#! /usr/bin/env node
if (process.argv[2] === '--help' || typeof process.argv[2] !== 'string') {
  console.log(`hashpow-gen 1.0

Generates messages backed by SHA-256 PoW

Provide a string as the first argument which will be the message to grind on.

Alternatively, provide -f followed by the path to a file containing the message.

If -m is provided, the message will not be printed (useful for long messages or binary data).`)
  process.exit(0)
}
const crypto = require('crypto')
let current = null,
  message = process.argv[2] === '-f'
    ? require('fs').readFileSync(process.argv[3])
    : process.argv[2],
  best = Buffer.from(
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  mute = process.argv.indexOf('-m') !== -1
while (true) {
  const preimage = `Type: SHA-256 PoW-backed Message
Nonce: ${crypto.randomBytes(16).toString('base64')}
===============================
${message}`
  const test = crypto.createHash('sha256').update(preimage).digest()
  if (Buffer.compare(best, test) === 1) {
    best = test, current = preimage
    console.log(`

Current Hash: ${best.toString('hex')}
Message:

${mute ? `Type: SHA-256 PoW-backed Message
Nonce: ${crypto.randomBytes(16).toString('base64')}
===============================
[message hidden]` : preimage}
`)
  }
}
