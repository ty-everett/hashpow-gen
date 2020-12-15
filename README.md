# hashpow-gen

[![npm version](https://badge.fury.io/js/hashpow-gen.svg)](https://badge.fury.io/js/hashpow-gen)

Generates messages backed by SHA-256 PoW

## Usage

Install this package in the global scope. Then run the `hashpow-gen` command.

Provide a string as the first argument which will be the message to grind on.

Alternatively, provide `-f` followed by the path to a file containing the message.

If `-m` is provided, the message will not be printed (useful for long messages or binary data).

Just leave it running until the printed hash has enough leading zeroes. The longer you wait, the lower the hash will go.

You can use this to demonstrate opportunity cost for messages. Either your message is useful, or you have just wasted your CPU time.

Parallel execution can be added if there is demand. For now, just run it on multiple machines or use multiple windows. Pull requests for this are welcome.

## License

MIT
