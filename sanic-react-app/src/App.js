import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Read from './Read';
import Create from './Create';
import Delete from './Delete';
import Update from './Update';

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
      <Route path="/delete" element={<Delete/>} />
      <Route path="/update" element={<Update/>} />
    </Routes>   
    </BrowserRouter>



  );

}

export default App;