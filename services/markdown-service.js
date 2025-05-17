const marked = require("marked");

exports.markdownToHtml = (markdown) => {
  return marked.parse(markdown);
}