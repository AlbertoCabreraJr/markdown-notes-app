# 📝 Markdown Note-taking API

It allows users to:
- Upload and save **Markdown** files
- Save notes directly as Markdown text
- **List** all saved notes
- **Render** Markdown as HTML
- **Check grammar** of note content via LanguageTool API

To use:
1. Save a note (Markdown text input)
```
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "my-note",
    "content": "# Hello\nThis is a markdown note."
  }'
```

2. Upload a Markdown file
```
curl -X POST http://localhost:3000/notes/upload \
  -F "file=@./example.md"
```

3. List all saved notes
```
curl http://localhost:3000/notes
```

4. Render a note as HTML
```
curl http://localhost:3000/notes/my-note/html
```

5. Check grammar
```
curl -X POST http://localhost:3000/notes/grammar \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This are a example of bad grammar."
  }'
```