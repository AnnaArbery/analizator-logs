import { createContext } from 'react';
import { optionsType } from '../types/optionsType';
import { logTypes } from '../data/initialData.ts';

export type logsContext = {
  log: logTypes;
  setLog: (log: logTypes) => void;
  options: optionsType;
  setOptions: (options: optionsType) => void;
  namesColumns: string[];
  setNamesColumns: (columns: string[]) => void;
};

const contextDefaultvalue: logsContext = {
  log: 'server',
  options: {
    title: '',
    fields: [],
    file: '',
    columns: '',
  },
  namesColumns: [],
  setLog: () => {},
  setOptions: () => {},
  setNamesColumns: () => {},
};

const LogsContext = createContext<logsContext>(contextDefaultvalue);

export default LogsContext;
