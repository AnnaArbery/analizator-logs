import { ConfigProvider } from 'antd';
import useFetch, { optionsType } from './hooks/useFetch';
import 'antd/dist/reset.css';
import './styles/App.scss';
// @ts-ignore
import castomThemeAntd from './castomThemeAntd.ts';
// import logServer from './types/logServerType.ts';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { useState } from 'react';
// import logServerType from './types/logServerType.ts';

const logArb = [
  'ip',
  'dash',
  'dash1',
  'date',
  'zone',
  'method',
  'url',
  'http',
  'status',
  'size',
  'refers',
  'agent',
];
const logTs40 = ['site', ...logArb];

function App() {
  const [url] = useState(import.meta.env.VITE_URL_LOGSERVER);
  const [options] = useState<optionsType>({
    file: 'ts40.ru-access_log.log',
    fields: logTs40,
  });
  const [logs] = useFetch(url, options) || [];
  const [columnsTitlesTable] = useFetch('columnsTitlesServerLog.json') || [];

  return (
    <ConfigProvider theme={castomThemeAntd}>
      <div className='layout'>
        <Header />
        <Content list={logs} columnsTitlesTable={columnsTitlesTable} />
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
