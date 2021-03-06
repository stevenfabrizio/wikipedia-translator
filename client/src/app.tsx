import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from './app/hooks';

import Header from './components/header';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Search from './pages/dashboard-pages/search';
import Translate from './pages/dashboard-pages/translate';

const App: React.FC = () => {
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: boolean } }) => state.authBoolean.value
  );

  React.useEffect(() => {
    if (authStatus) {
      <Navigate to="/dashboard" replace />;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Search />} />
            <Route path="search" element={<Search />} />
            <Route path="translate" element={<Translate />} />
            <Route path="*" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
