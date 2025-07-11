const { generateCode } = require('../src/generator');
const { refineCode } = require('../src/ai-refiner');

test('Generate HTML from dummy Figma data', () => {
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
  expect(refinedHtml).toContain('id="frame1"');
  expect(refinedHtml).toContain('class="frame');
  expect(refinedHtml).toContain('flex flex-row"');
  expect(refinedHtml).toContain('id="text1"');
  expect(refinedHtml).toContain('Hello');
});
