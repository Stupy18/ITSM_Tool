// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/api/store.js'; 
import LoggedPage from '../src/page/LoggedPage.tsx';
import LoginPage from '../src/page/LoginPage.tsx';
import RegisterUserPage from '../src/page/RegisterUserPage.tsx';
import RegisterCompanyPage from '../src/page/RegisterCompanyPage.tsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logged" element={<LoggedPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
          <Route path="/company/register" element={<RegisterCompanyPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
