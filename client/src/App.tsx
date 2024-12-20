import { ConfigProvider } from 'antd';
import useFetch from './hooks/useFetch';
import './styles/App.scss';
import castomThemeAntd from './castomThemeAntd.ts';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { useState } from 'react';
import LogsContext from './context/logsContext.ts';
import { optionsType } from './types/optionsType.ts';
import { initLogSettings, logTypes } from './data/initialData.ts';

function App() {
  const [log, setLog] = useState<logTypes>('server');
  const [options, setOptions] = useState<optionsType>(initLogSettings[log]);
  const [columnsTitlesTable] = useFetch(options.columns) || [];

  const [logs] = useFetch(import.meta.env.VITE_URL_LOG, options) || [];

  return (
    <ConfigProvider theme={castomThemeAntd}>
      <LogsContext.Provider value={{ log, setLog, options, setOptions }}>
        <div className='layout'>
          <Header title={options.title} />
          {JSON.stringify(options)}
          <Content list={logs} columnsTitlesTable={columnsTitlesTable} />
          <Footer />
        </div>
      </LogsContext.Provider>
    </ConfigProvider>
  );
}

export default App;
