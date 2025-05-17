const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const noteController = require('../controllers/note-controller');

router.get("/", noteController.listNotes);
router.get("/:filename/html", noteController.renderNote);
router.post("/", noteController.saveNote);
router.post("/grammar", noteController.checkGrammar);
router.post("/upload", upload.single('file'), noteController.uploadNote);

module.exports = router;