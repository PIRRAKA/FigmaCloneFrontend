const puppeteer = require('puppeteer');
const { generateCode } = require('../src/generator');
const { refineCode } = require('../src/ai-refiner');
const { exportCode } = require('../src/exporter');

test('Test generated HTML in browser', async () => {
  const dummyData = {
    type: 'FRAME',
    id: 'frame1',
    absoluteBoundingBox: { x: 0, y: 0, width: 100, height: 100 },
    layoutMode: 'HORIZONTAL',
    children: [
      {
        type: 'TEXT',
        id: 'text1',
        absoluteBoundingBox: { x: 10, y: 10, width: 50, height: 20 },
        style: { fontFamily: 'Arial', fontSize: 12 },
        characters: 'Hello'
      }
    ]
  };
  const html = generateCode(dummyData);
  const refinedHtml = refineCode(html);
  exportCode(refinedHtml, 'test-dist');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/test-dist/index.html`);
  const frameExists = await page.$('#frame1') !== null;
  const textExists = await page.$('#text1') !== null;
  expect(frameExists).toBe(true);
  expect(textExists).toBe(true);
  await browser.close();
}, 10000);  // Timeout de 10s para Puppeteer
