import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as readline from 'node:readline/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLogServer } from './controllers/logControllers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

// http://localhost:4444/static - html-ка

const port = process.env.SERVER_PORT || 4444;

const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // парсинг application/json
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get('/', function (req, res) {
  res.send(
    `<h2>Сервер запущен на порту ${port}, ссылка ${req.url}, метод: ${req.method}</h2>`
  );
});

// app.post('/send', (req, res) => {
//   console.log(req.body, req.url, 'req.body');
//   res.json({ ...req.body, link: req.url });
// });

// app.use('/static', express.static(__dirname + '/public'));

// let getfile = readline.createInterface({
//   input: fs.createReadStream('files/anna-arbery.ru.access.log'),
// });

// let lineno = 0;
// myInterface.on('line', function (line) {
//   lineno++;
//   console.log('Line number ' + lineno + ': ' + line);
// });

app.post('/logserver', getLogServer);

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
