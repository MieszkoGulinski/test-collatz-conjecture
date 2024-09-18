import fs from "fs";

// Configuration constants

const START_NUMBER = 2n ** 10n + 1n;
const END_NUMBER = 2n ** 11n + 1n;
const FILE_NAME = "results.csv";

const checkConjecture = (
  startNumber: bigint
): [bigint, bigint, bigint, number] => {
  const t0 = performance.now();

  let currentNumber = startNumber;
  let iterations = 0n;
  let max = currentNumber;

  while (currentNumber !== 1n) {
    if (currentNumber % 2n === 0n) {
      currentNumber /= 2n;
      // TODO check if (currentNumber << 1n) is faster
    } else {
      currentNumber = 3n * currentNumber + 1n;
      // TODO check if (currentNumber*2n) + currentNumber + 1n is faster
    }

    if (currentNumber > max) {
      max = currentNumber;
    }

    iterations++;
  }

  const t1 = performance.now();

  return [startNumber, iterations, max, t1 - t0];
};

// TODO distribute the work to multiple worker threads
// TODO write the results to a file in chunks, so that we won't have overhead from writing to the file for each number

// No need to check even numbers, as they will always become odd in one of the next steps. START_NUMBER must be odd.
for (let i = START_NUMBER; i < END_NUMBER; i = i + 2n) {
  const [start, iterations, max, timeMs] = checkConjecture(i);

  fs.appendFileSync(
    FILE_NAME,
    start.toString() +
      "," +
      iterations.toString() +
      "," +
      max.toString() +
      "," +
      timeMs +
      "\n"
  );
}
