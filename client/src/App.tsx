import { ConfigProvider } from 'antd';
import useFetch, { optionsType } from './hooks/useFetch';
// import 'antd/dist/reset.css';
import './styles/App.scss';
// @ts-ignore
import castomThemeAntd from './castomThemeAntd.ts';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { useState } from 'react';

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

const initSettings = {
  url: import.meta.env.VITE_URL_LOGSERVER,
  fields: ['site', ...logArb],
  file: 'ts40.ru-access_log.log',
};

function App() {
  const [url] = useState(initSettings.url);
  const [options] = useState<optionsType>({
    file: initSettings.file,
    fields: initSettings.fields,
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
