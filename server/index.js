import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLogServer } from './controllers/logControllers.js';
import multer from 'multer';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.SERVER_PORT || 4444;
const app = express();

const storageConfig = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `${__dirname}/files`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.post('/logserver', getLogServer);

app.post(
  '/upload',
  multer({ storage: storageConfig }).single('logfile'),
  (req, res) => {
    res.json({
      name: `${req.file.originalname}`,
    });
  }
);

app.all('*', function (req, res) {
  res
    .status(404)
    .send(
      `<h2>Cтраница не существует, порт: ${port}, ссылка: ${req.url}, метод: ${req.method}</h2>`
    );
});

// Server
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server sucсess port=${port}`);
});
