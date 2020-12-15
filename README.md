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

## Example

Alice has a message she thinks is important and wahts to share. Bob is a busy executive and Carol is a bored teenager.

To prove that her message is worth reading, Alice needs to demonstrate that she put a lot of work into creating it. And while this does not guarantee that the message is valuable to the recipient, it does guarantee that if it is not valuable, Alice has wasted resources on creating it. Therefore, if Alice is rational, she will spend only as much work creating it as she thinks the message to be worth to those who will read it.

The more zeroes at the beginning of a SHA-256 hash, the more work had to be done in order to create the hash. Every extra zero means that sixteen times more work was needed. The table below shows how many tries (how much work) it will take on average to get a specific number of zeroes at the beginning of the hash:

Number of Zeroes  | Amount of Tries (work)
------------------|-------------------------
0                 | 0
1                 | 16
2                 | 256
3                 | 4,096
4                 | 65,536
5                 | 1,048,576
6                 | 16,777,216
7                 | 268,435,456
8                 | ~4.3 billion
9                 | ~69 billion
10                | ~1.1 trillion
11                | ~17 trillion
12                | ~281 trillion
13                | ~4.5 quadrillion
14                | ~72 quadrillion

The tool will pick a random nonce (the thing at the top of the message) for each try. Then it will check if the hash is any better than the best one that we already have. If the hash is any better, it will print it out on the screen along with the nonce.

Alice uses this tool to generate a message:

```sh
hashpow-gen "Hello everyone, I have something to announce:

Foo is definitely a bar.

Thank you."
```

Alice has a goal to get a PoW message with a hash that has at least four zeroes. Based on how valuable she thinks the message is, she thinks that four zeroes is a reasonable amount of effort to expend on sharing it.

After running the command, she watches her terminal screen until the hash has at least four zeroes at the beginning. The output might look like this:

```
Current Hash: 0000508447ebae3be0c25f8de53880aa64773c371eadb6e312d72aa829b8a3a7
Message:

Type: SHA-256 PoW-backed Message
Nonce: D4UZh4eBp1aRJhGZu+M2hA==
===============================
Hello everyone, I have something to announce:

Foo is definitely a bar.

Thank you.
```

Alice can now share the PoW message, which is the portion below:

```
Type: SHA-256 PoW-backed Message
Nonce: D4UZh4eBp1aRJhGZu+M2hA==
===============================
Hello everyone, I have something to announce:

Foo is definitely a bar.

Thank you.
```

Before reading Alice's message, anyone can now use a tool like [SHA256 Online](https://emn178.github.io/online-tools/sha256.html) to check how many zeroes the hash has at the beginning. Copy-pasting the message into the tool shows that it has four eroes:

```
0000508447ebae3be0c25f8de53880aa64773c371eadb6e312d72aa829b8a3a7
```

We now turn back to Bob the executive and Carol the teenager. They have decided that it would be rational to look at how much work someone put into the messages they are going to read. They have a few rules that they like to follow:

Bob will only read messages that have at least 5 zeroes at the beginning of their hash. However, he will read messages with as few as three zeroes if they were specifically created for him.

On the other hand, since Carol is bored, she has decided to read all messages with at least 3 zeroes at the beginning. Also, she will read all messages sent directly to her no matter how many zeroes they have.

Bob sees Alice's message. Before reading it he (or his compute program) checks what the hash is. He pastes the hash into [SHA256 Online](https://emn178.github.io/online-tools/sha256.html) and counts the zeroes. Since it only has four, and since it wasn't sent directly to him, he ignores it. Alice didn't do enough work to buy his attention.

Carol does the same thing. Since the message is within her threshold, she decides to read it. People who want to see less stuff (because they are busier) can set higher numbers of zeroes on their hashes.

But let's suppose that Alice REALLY wants Bob to see the message. She creates a message specially for him and sends it to him. Using the tool:

```sh
hashpow-gen "Hey Bob,

I think this is really important and I thought you should read it:

Foo is definitely a bar.

Cheers!

Your friend,
— Alice"
```

She gets the output:

```
Current Hash: 0000004c533e9aec490ced8b635480613c8b54cdc1d099096ce1f3c01306c9e2
Message:

Type: SHA-256 PoW-backed Message
Nonce: 2FTxFjHnjIjK6vnpatQZYA==
===============================
Hey Bob,

I think this is really important and I thought you should read it:

Foo is definitely a bar.

Cheers!

Your friend,
— Alice
```

Sending it to Bob, he notices the exceptionally high number of zeroes. Combined with the fact that it was made specifically for him, he decides to take the time and read it.

## Commentary

This tool demonstrates the potential for a new way to communicate, filter content and convey value over the internet. The de facto message format in use by the library is:

```
Current Hash: 0000004c533e9aec490ced8b635480613c8b54cdc1d099096ce1f3c01306c9e2
Message:

Type: SHA-256 PoW-backed Message
Nonce: <128-bit random nonce encoded in base64>
===============================
<message, can be binary data, text or anything defined by other protocols>
```

Software, messaging systems, browser extensions and filtering tools can be built around this standard. Eventually, a market for buying PoW can develop, which will allow people to outsource and specialize.

## License

MIT
