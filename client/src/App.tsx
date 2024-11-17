import { useEffect } from 'react';
import './styles/App.css';

function App() {
  // запрос к серверу
  useEffect(() => {
    (async function fetchData() {
      let data = {
        title: 'Тестовый запрос',
        text: 'Текст',
      };

      try {
        const res = await fetch('http://localhost:9000/send/', {
          method: 'POST',
          body: JSON.stringify(data),
          // body: JSON.stringify(Object.fromEntries(data)),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const json = await res.json();
        console.log(json);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return <>базовое приложение</>;
}

export default App;
