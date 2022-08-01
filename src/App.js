import React from 'react';
import './App.css';

function App() {
  const [angka, setAngka] = React.useState([]);

  fetch('http://127.0.0.1:8000/api/coba')
  .then((response) => response.json())
  .then((data) => setAngka(data.data));

  return (
    <>
      {angka.map(data=>` ${data} , `)}
    </>
  );
}

export default App;
