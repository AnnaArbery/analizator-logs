import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getLogServer = async (req, res) => {
  const initialFields = ['ip', 'dash', 'dash1', 'agent'];
  const {
    file = `../files/anna-arbery.ru.access.log`,
    fields = initialFields,
  } = req.body;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(__dirname, `../files/${file}`);
  const lines = fs.readFileSync(filepath, 'utf8').split(/\r?\n/);

  const normalizeValue = (value, option) => {
    let result = value.replace(/\"|\[|\]/gi, '');

    if (option === 'date') {
      const [day, month, year, hour, min, sec] = result.split(/\/|:/);
      result = +new Date(`${month} ${day}, ${year} ${hour}:${min}:${sec}`);
    }

    if (option === 'status') result = Number(result);
    if (result === '-') result = '';

    return result;
  };

  let logs = lines.reduce((acc, line, idx) => {
    if (line.length) {
      const words = line.split(' ');
      const res = words.reduce((acc, item, idx) => {
        if (idx <= fields.length - 1)
          acc[fields[idx]] = normalizeValue(item, fields[idx]);
        else {
          acc[fields[fields.length - 1]] +=
            ' ' + normalizeValue(item, fields[fields.length - 1]);
        }
        return acc;
      }, {});
      acc.push({ key: idx, ...res });
    }

    return acc;
  }, []);
  res.json(logs);
};
