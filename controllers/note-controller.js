const path = require('path');

const noteModel = require('../models/note-model');
const { markdownToHtml } = require("../services/markdown-service");
const { checkGrammar } = require("../services/grammar-service");

exports.listNotes = async (req, res) => {
  try {
    const notes = await noteModel.list();
    return res.send(notes);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.renderNote = async (req, res) => {
  try {
    const content = await noteModel.read(req.params.filename);

    if (!content) {
      return res.status(404).send({ error: "Note not found" });
    }

    const html = markdownToHtml(content);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.saveNote = async (req, res) => {
  try {
    const { filename, content } = req.body;

    if (!filename || !content) {
      return res.status(400).send({ error: "Filename and content are required" });
    }
  
    await noteModel.save(filename, content);
    return res.send({ message: "Note saved successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.checkGrammar = async (req, res) => {
  try {
    const { content } = req.body;
  
    if (!content) {
      return res.status(400).send({ error: "Content is required" });
    }
  
    const result = await checkGrammar(content);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(req.file.originalname);
    
    if (ext !== '.md') {
      return res.status(400).json({ error: 'Only .md files are allowed' });
    }
  
    const content = await noteModel.readRaw(req.file.path);
    const filename = path.basename(req.file.originalname, '.md');
  
    await noteModel.save(filename, content);
    return res.json({ message: `Uploaded and saved as ${filename}.md` });
  } catch (error) {
    return res.status(500).send(error);
  }
}