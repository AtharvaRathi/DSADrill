const fs = require('fs');
const seederContent = fs.readFileSync('src/utils/seeder.ts', 'utf8');
const titles = [];
const regex = /mkQ\("([^"]+)"/g;
let match;
while ((match = regex.exec(seederContent)) !== null) {
  titles.push(match[1]);
}
let covered = new Set();
for (let i = 1; i <= 10; i++) {
  try {
    const file = fs.readFileSync('src/utils/seederDataBatch' + i + '.ts', 'utf8');
    const titleRegex = /"([^"]+)":\s*\{/g;
    let tMatch;
    while ((tMatch = titleRegex.exec(file)) !== null) {
      covered.add(tMatch[1]);
    }
  } catch(e){}
}
const missing = titles.filter(t => !covered.has(t));
console.log(missing.slice(0, 25).join('\n'));
