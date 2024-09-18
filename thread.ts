// prevents TS errors
declare var self: Worker;

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

self.onmessage = (event) => {
  const startNumber = event.data.start as bigint;
  const endNumber = event.data.end as bigint;
  const chunkSize = BigInt(event.data.chunkSize as number);

  const results = [];

  for (let i = startNumber; i < endNumber; i = i + chunkSize) {
    // Executed for each chunk
    const chunkEnd = i + chunkSize;
    // No need to check even numbers, as they will always become odd in one of the next steps
    for (let j = i; j < chunkEnd; j = j + 2n) {
      const [start, iterations, max, timeMs] = checkConjecture(j);
      results.push([start, iterations, max, timeMs]);
    }

    self.postMessage(results);
  }

  // shut down the worker
  process.exit();
};
