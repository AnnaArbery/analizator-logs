import { ConfigProvider } from 'antd';
import useFetch from './hooks/useFetch';
import useFetchLog from './hooks/useFetchLog';
import castomThemeAntd from './castomThemeAntd.ts';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { useState, useEffect } from 'react';
import LogsContext from './context/logsContext.ts';
import { optionsType } from './types/optionsType.ts';
import { initLogSettings, logTypes } from './data/initialData.ts';
import './styles/App.scss';

function App() {
  const [log, setLog] = useState<logTypes>('server');
  const [options, setOptions] = useState<optionsType>(initLogSettings[log]);
  const [namesColumns, setNamesColumns] = useState<string[]>([]);
  const [columnsTitlesTable] = useFetch(options.columns) || [];

  const [logs] = useFetchLog(import.meta.env.VITE_URL_LOG, options) || [];

  useEffect(() => {
    const namesColumns = Object.keys(columnsTitlesTable);
    setNamesColumns(namesColumns);
  }, [columnsTitlesTable]);

  return (
    <ConfigProvider theme={castomThemeAntd}>
      <LogsContext.Provider
        value={{
          log,
          setLog,
          options,
          setOptions,
          namesColumns,
          setNamesColumns,
        }}
      >
        <div className='layout'>
          <Header title={options.title} />
          <Content list={logs} columnsTitlesTable={columnsTitlesTable} />
          <Footer />
        </div>
      </LogsContext.Provider>
    </ConfigProvider>
  );
}

export default App;
