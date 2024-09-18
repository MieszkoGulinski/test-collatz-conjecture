# test-collatz-conjecture

Tests [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) for a given range of starting numbers.

## What is the Collatz conjecture?

The conjecture says that for every integer taken as the starting point, the sequence:

```
a(n+1) = a(n) / 2 if a(n) is even
a(n+1) = 3 * a(n) + 1 if a(n) is odd
```

will eventually reach 1.

As of writing this, the conjecture has not been proven or disproven, and is an unsolved problem in mathematics. It was tested by brute force for numbers up to 2^60, and so far all starting numbers tested have reached 1.

## Configuration and output

Edit the `START_NUMBER` and `END_NUMBER` constants in `index.ts` to change the range. Start and end must be positive odd integers written as a [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), denoted by appending `n` to the number.

Writes the results to a CSV file, in the format:

- initial number
- number of steps to reach 1
- largest number reached
- time in ms taken to reach 1

File name is configurable in the `FILE_NAME` constant.

Runs on a specified number of [workers](https://bun.sh/docs/api/workers), each worker taking a part of the range to test. This is done to split the work and make use of multiple CPU cores.

To avoid overhead when writing to a file, the results in each worker are saved in memory, and then sent from the worker thread to the main thread in chunks. Then, the main thread appends the chunk of the received results to the output file.

### Order of results

The content of results file may not be ordered from the lowest starting number to the highest. This is because the workers are independent and may finish their work in a different order.

## How to run

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Future improvements

- Save the results to a file in chunks consisting of multiple start numbers, to reduce the number of writes and avoid overhead of writing to a file

## Other notes

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
