import fs from "node:fs";
import os from "node:os";

// Configuration constants

const START_NUMBER = 2n ** 10n + 1n;
const END_NUMBER = 2n ** 11n + 1n;
const THREAD_COUNT = os.availableParallelism();
const CHUNK_SIZE = 2n ** 8n; // each worker thread will send results back in chunks of this size, and the chunk will be then written to the results file
const FILE_NAME = "results.csv";

// Distribute the work to multiple worker threads

if (START_NUMBER % 2n === 0n) {
  throw new Error("Start number must be odd");
}
if (END_NUMBER % 2n === 0n) {
  throw new Error("End number must be odd");
}

const threadRange = (END_NUMBER - START_NUMBER) / BigInt(THREAD_COUNT);
for (let i = 0; i < THREAD_COUNT; i = i + 1) {
  const thread = new Worker("./thread.ts");

  const start = START_NUMBER + BigInt(i) * threadRange;
  const end = start + threadRange;

  thread.postMessage({
    start,
    end,
    chunkSize: CHUNK_SIZE,
  });

  thread.onmessage = (event) => {
    const formattedChunk = event.data
      .map((row: [bigint, bigint, bigint, number]) => {
        return row.join(",");
      })
      .join("\n");

    fs.appendFileSync(FILE_NAME, formattedChunk);
  };
}
