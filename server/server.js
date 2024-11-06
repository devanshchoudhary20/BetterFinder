// server.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to open and serve the Excel file directly
app.post('/open', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.originalname);

  // Write the uploaded file to the server
  fs.writeFileSync(filePath, req.file.buffer);

  // Read the file as a buffer and send it back to the frontend
  const fileBuffer = fs.readFileSync(filePath);
  res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(fileBuffer);
});

// Endpoint to save Excel file directly
app.post('/save', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.originalname);

  // Save the file as-is to preserve formatting
  fs.writeFileSync(filePath, req.file.buffer);
  res.json({ message: 'File saved successfully', path: filePath });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
