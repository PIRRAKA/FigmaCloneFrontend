function parseFigmaDesign(data) {
  const document = data.document;
  function traverse(node) {
    if (node.type === 'FRAME' && !node.layoutMode) {
      console.warn('Warning: Auto Layout missing in node', node.id);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  traverse(document);
  return document;
}

module.exports = { parseFigmaDesign };
