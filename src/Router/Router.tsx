import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Main from '../pages/Main/Main';

const Router = ({ isAuthorized }: { isAuthorized: boolean }) => {
  return (
    <BrowserRouter>
      {isAuthorized ? (
        <Routes>
          <Route index element={<Navigate to="/green-api" replace />} />
          <Route path='/green-api' element={<Main />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Navigate to="/green-api" replace/>} />
          <Route path='/green-api' element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
