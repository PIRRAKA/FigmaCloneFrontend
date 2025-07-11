function parseFigmaDesign(data) {
  const document = data.document;
  function traverse(node, warnings = []) {
    if (node.type === 'FRAME' && !node.layoutMode) {
      warnings.push(`Auto Layout missing in node ${node.id}`);
    }
    if (node.children) {
      node.children.forEach(child => traverse(child, warnings));
    }
    return warnings;
  }
  const warnings = traverse(document);
  if (warnings.length) throw new Error(warnings.join('; '));
  return document;
  }

module.exports = { parseFigmaDesign };
