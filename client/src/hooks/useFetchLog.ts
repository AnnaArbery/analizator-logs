import { useState, useEffect } from 'react';
import { optionsType } from '../types/optionsType';

const useFetch = <T extends []>(
  url: string,
  options: Partial<optionsType> = {}
): [T, string] => {
  const [response, setResponse] = useState<T>([] as T);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
        setStatus('loaded');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [url, options.file, options.fields]);

  return [response, status];
};

export default useFetch;
