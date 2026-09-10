import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Principal from './pages/principal';

function Pathing() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Pathing;