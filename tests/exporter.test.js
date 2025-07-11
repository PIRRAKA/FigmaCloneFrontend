const { exportCode } = require('../src/exporter');
const fs = require('fs');
const path = require('path');

test('Export HTML to file', () => {
  const dummyHtml = '<html><body><h1>Test</h1></body></html>';
  const outputDir = 'test-dist';
  exportCode(dummyHtml, outputDir);
  const htmlPath = path.join(outputDir, 'index.html');
  expect(fs.existsSync(htmlPath)).toBe(true);
  const content = fs.readFileSync(htmlPath, 'utf-8');
  expect(content).toContain('<h1>Test</h1>');
  fs.unlinkSync(htmlPath);
  fs.rmdirSync(outputDir);
});
