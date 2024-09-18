# test-collatz-conjecture

Tests Collatz conjecture for a given range of starting numbers, taking into account only odd numbers. Edit the `start` and `end` constants in `index.ts` to change the range.

Writes the results to a CSV file, in the format:

- initial number
- number of steps to reach 1
- largest number reached
- time in ms taken to reach 1

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

- Divide the work between multiple workers, to take advantage of multiple cores
- Save the results to a file in chunks consisting of multiple start numbers, to reduce the number of writes and avoid overhead of writing to a file

## Other notes

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
