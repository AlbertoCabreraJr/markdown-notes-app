const fs = require("fs-extra")
const path = require("path")

const NOTES_DIR = path.join(__dirname, "notes");
fs.ensureDirSync(NOTES_DIR);

exports.save = async (filename, content) => {
  const filePath = path.join(NOTES_DIR, `${filename}.md`);
  return fs.writeFile(filePath, content);
}

exports.list = async () => {
  const files = await fs.readdir(NOTES_DIR);
  return files.filter(file => file.endsWith(".md")).map(file => file.replace(".md", ""));
}

exports.read = async (filename) => {
  const filePath = path.join(NOTES_DIR, `${filename}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFile(filePath, "utf8");
}

exports.readRaw = async (filePath) => {
  return fs.readFile(filePath, 'utf-8');
}