import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeValue } from '../utils.js';

export const getLogServer = async (req, res) => {
  const initialFields = ['ip', 'dash', 'dash1', 'agent'];
  let {
    file = `../files/anna-arbery.ru.access.log`,
    fields = initialFields,
    title = '',
  } = req.body;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(__dirname, `../files/${file}`);
  const lines = fs.readFileSync(filepath, 'utf8').split(/\r?\n/);

  let logs = lines.reduce((acc, line, idx) => {
    let fieldsLine = fields;

    if (line.length) {
      if (!line.includes('from') && title === 'xray') {
        fieldsLine = [...fields.slice(0, 5), 'txt'];
      }

      const words = line.replace(/\s+/g, ' ').split(' ');
      const lastIndex = fieldsLine.length - 1;

      let res = words.reduce((acc, item, idx) => {
        if (idx <= lastIndex) acc[fieldsLine[idx]] = item;
        else {
          acc[fieldsLine[lastIndex]] += ' ' + item;
        }
        return acc;
      }, {});

      Object.keys(res).forEach((value) => {
        res[value] = normalizeValue(res[value], value);
      });

      if (title === 'xray') {
        let {
          data1,
          data2,
          data3,
          data4 = '',
          data5,
          server,
          accepted,
          t2,
          t3,
          from,
          mm,
          ...res_xray
        } = res;

        let year = new Date().getFullYear();
        if (line.includes('from')) {
          [year] = data4?.split('/');
          res_xray.txt = `${res_xray.txt} ${t2} ${t3}`;
        }
        res_xray.data = +new Date(`${data1} ${data2} ${year} ${data3}`);

        if (res_xray.url) {
          res_xray.url = normalizeValue(res_xray.url, 'url-xray');
        }
        if (res_xray.ip) {
          res_xray.ip = normalizeValue(res_xray.ip, 'ip-xray');
        }
        if (res_xray.process) {
          res_xray.process = normalizeValue(res_xray.process, 'process-xray');
        }
        res = { ...res_xray };
      }

      if (title === 'file2ban') {
        let { data1, data2, af, pid, type, t, data3, data4, ...res_fail2ban } =
          res;
        data2 = data2.split(',')[0];

        res_fail2ban.data = +new Date(`${data1} ${data2}`);

        res = { ...res_fail2ban };
      }
      acc.push({ key: idx, ...res });
    }

    return acc;
  }, []);
  res.json(logs);
};
