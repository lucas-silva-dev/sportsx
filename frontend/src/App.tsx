import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Customer } from './pages/Customer';

import { Home } from './pages/Home';
import { Register } from './pages/Register';

import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='customers'>
          <Route path='' element={<Customer />} />
          <Route path='new' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
