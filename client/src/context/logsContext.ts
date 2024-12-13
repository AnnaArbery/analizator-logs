import { createContext } from 'react';
import { optionsType } from '../types/optionsType';
import { logTypes } from '../data/initialData.ts';

type logsContext = {
  log: logTypes;
  setLog: (log: logTypes) => void;
  options: optionsType;
  setOptions: (options: optionsType) => void;
};

const contextDefaultvalue: logsContext = {
  log: 'server',
  options: {
    title: '',
    fields: [],
    file: '',
    columns: ''
  },
  setLog: () => {},
  setOptions: () => {},
};

const LogsContext = createContext<logsContext>(contextDefaultvalue);

export default LogsContext;
