const ejs = require('ejs');

function generateCode(parsedData) {
  const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Figma to HTML</title>
      <style>
        body { margin: 0; }
        .frame { position: absolute; display: flex; }
        .text { position: absolute; }
        .rectangle { position: absolute; }
      </style>
    </head>
    <body>
      <% function renderNode(node) { %>
        <% if (node.type === 'FRAME') { %>
          <div class="frame" id="<%= node.id %>" style="
            left: <%= node.absoluteBoundingBox.x %>px;
            top: <%= node.absoluteBoundingBox.y %>px;
            width: <%= node.absoluteBoundingBox.width %>px;
            height: <%= node.absoluteBoundingBox.height %>px;
            <%= node.layoutMode === 'HORIZONTAL' ? 'flex-direction: row;' : node.layoutMode === 'VERTICAL' ? 'flex-direction: column;' : '' %>
          ">
            <% (node.children || []).forEach(child => { %>
              <% renderNode(child); %>
            <% }); %>
          </div>
        <% } else if (node.type === 'TEXT') { %>
          <p class="text" id="<%= node.id %>" style="
            left: <%= node.absoluteBoundingBox.x %>px;
            top: <%= node.absoluteBoundingBox.y %>px;
            width: <%= node.absoluteBoundingBox.width %>px;
            font-family: <%= node.style?.fontFamily || 'Arial' %>;
            font-size: <%= node.style?.fontSize || 12 %>px;
          ">
            <%= node.characters %>
          </p>
        <% } else if (node.type === 'RECTANGLE') { %>
          <div class="rectangle" id="<%= node.id %>" style="
            left: <%= node.absoluteBoundingBox.x %>px;
            top: <%= node.absoluteBoundingBox.y %>px;
            width: <%= node.absoluteBoundingBox.width %>px;
            height: <%= node.absoluteBoundingBox.height %>px;
            background-color: rgba(
              <%= node.fills[0]?.color.r * 255 || 0 %>,
              <%= node.fills[0]?.color.g * 255 || 0 %>,
              <%= node.fills[0]?.color.b * 255 || 0 %>,
              <%= node.fills[0]?.opacity || 1 %>
            );
          "></div>
        <% } %>
      <% } %>
      <% renderNode(data); %>
    </body>
    </html>
  `;
  return ejs.render(template, { data: parsedData });
}

module.exports = { generateCode };
