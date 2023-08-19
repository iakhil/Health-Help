import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Read from './Read';
import Create from './Create';

function App(){
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/')
    .then(response => {
      setMessage(response.data.message);
    })
  }, []);

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/read" element={<Read/>} />
      <Route path="/create" element={<Create/>} />
    </Routes>   
    </BrowserRouter>



  );

}

export default App;