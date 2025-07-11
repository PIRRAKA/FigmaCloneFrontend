function refineCode(html) {
  const pattern = /<div class="frame" id="([^"]+)" style="\s*left: (\d+)px;\s*top: (\d+)px;\s*width: (\d+)px;\s*height: (\d+)px;\s*flex-direction: row;\s*">/g;
  const refined = html.replace(pattern, (match, id, left, top, width, height) => {
    return `<div class="frame absolute left-[${left}px] top-[${top}px] w-[${width}px] h-[${height}px] flex flex-row" id="${id}">`;
  });
  return refined;
}

module.exports = { refineCode };
