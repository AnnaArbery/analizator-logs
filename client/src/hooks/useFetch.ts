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
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(options),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const json = await res.json();
        setResponse(json);
        setStatus('loaded');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [url]);

  return [response, status];
};

export default useFetch;
