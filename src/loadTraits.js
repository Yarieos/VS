const fs = require('fs');
const csv = require('csv-parser');

function loadTraits(sheetName, callback) {
  let sheetTraits = [];
  fs.createReadStream(`${sheetName}.csv`)
    .pipe(csv())
    .on('data', (row) => {
      sheetTraits.push(row);
    })
    .on('end', () => {
      callback(sheetTraits);
    });
}

function parseExclusions(traits) {
  return traits.map(trait => ({
    ...trait,
    ExcludeWith: trait['Exclude With'] ? trait['Exclude With'].split(',').map(t => t.trim()) : []
  }));
}

module.exports = { loadTraits, parseExclusions };
