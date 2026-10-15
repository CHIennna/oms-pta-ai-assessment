'use strict';

function indentationDeleteSize(spaceCount, indentationWidth = 4) {
  if (!Number.isInteger(spaceCount) || spaceCount <= 0) return 0;
  if (!Number.isInteger(indentationWidth) || indentationWidth <= 0) return 1;
  return spaceCount % indentationWidth === 0
    ? Math.min(spaceCount, indentationWidth)
    : 1;
}

module.exports = {indentationDeleteSize};
