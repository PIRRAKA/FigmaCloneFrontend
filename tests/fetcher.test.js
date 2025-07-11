const { fetchFigmaDesign } = require('../src/fetcher');

test('Fetch Figma dummy', async () => {
  expect(typeof fetchFigmaDesign).toBe('function');
});
