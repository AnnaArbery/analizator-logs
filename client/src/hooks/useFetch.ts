import { useState, useEffect } from 'react';

const useFetchLog = <T extends []>(url: string): [T, string] => {
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
  }, [url]);

  return [response, status];
};

export default useFetchLog;
