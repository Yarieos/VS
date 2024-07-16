const { loadTraits, parseExclusions } = require('./loadTraits');
let allTraits = [];

function loadAllTraits(callback) {
  let sheets = ['M1', 'M2', 'M3', 'M4'];
  let loadedSheets = 0;

  sheets.forEach(sheet => {
    loadTraits(sheet, (data) => {
      allTraits = allTraits.concat(data);
      loadedSheets++;
      if (loadedSheets === sheets.length) {
        allTraits = parseExclusions(allTraits);
        callback();
      }
    });
  });
}

const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(() => {
  buildSetup();
  startCreating();
})();
