import { batch1Enrichments } from './src/utils/seederDataBatch1';
import { batch2Enrichments } from './src/utils/seederDataBatch2';
import { batch3Enrichments } from './src/utils/seederDataBatch3';
import { batch4Enrichments } from './src/utils/seederDataBatch4';
import { batch5Enrichments } from './src/utils/seederDataBatch5';
import { batch6Enrichments } from './src/utils/seederDataBatch6';
import { batch7Enrichments } from './src/utils/seederDataBatch7';
import { batch8Enrichments } from './src/utils/seederDataBatch8';
import { batch9Enrichments } from './src/utils/seederDataBatch9';
import { batch10Enrichments } from './src/utils/seederDataBatch10';
import { batch11Enrichments } from './src/utils/seederDataBatch11';

const allBatches = [
  batch1Enrichments, batch2Enrichments, batch3Enrichments, batch4Enrichments,
  batch5Enrichments, batch6Enrichments, batch7Enrichments, batch8Enrichments,
  batch9Enrichments, batch10Enrichments, batch11Enrichments
];

for (let i = 0; i < allBatches.length; i++) {
  const batch = allBatches[i];
  for (const title in batch) {
    const q = batch[title];
    if (q.examples) {
      for (let j = 0; j < q.examples.length; j++) {
        const ex = q.examples[j];
        if (!ex.output) {
          console.log(`Error in Batch ${i + 1}, Title: "${title}", Example ${j}`);
        }
      }
    }
  }
}
