// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/api/store.js'; 
import LoggedPage from '../src/pages/LoggedPage.tsx';
import LoginPage from '../src/pages/Login/LoginPage.tsx';
import RegisterUserPage from '../src/pages/Register/UserRegistrationPage.tsx';
import RegisterCompanyPage from '../src/pages/Register/CompanyRegistrationPage.tsx';
import TicketPage from './pages/YourAssignedTickets/TicketPage.tsx';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logged" element={<LoggedPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
          <Route path="/company/register" element={<RegisterCompanyPage />} />
          <Route path="/tickets" element={<TicketPage/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
