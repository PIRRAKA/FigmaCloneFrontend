const fs = require('fs');
const path = require('path');

function exportCode(refinedHtml, outputDir = 'dist') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const htmlPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(htmlPath, refinedHtml);
  console.log(`HTML exported to ${htmlPath}`);
}

module.exports = { exportCode };
