import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/api/store.js';
import Layout from './pages/Navbar/Layout.tsx';
import LoginPage from '../src/pages/Login/LoginPage.tsx';
import RegisterUserPage from '../src/pages/Register/UserRegistrationPage.tsx';
import RegisterCompanyPage from '../src/pages/Register/CompanyRegistrationPage.tsx';
import TicketPage from './pages/YourAssignedTickets/TicketPage.tsx';
import InvitePage from './pages/InvitePage/InvitePage.tsx';
import LoggedPage from './pages/LoggedPage/LoggedPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx';
import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard.tsx';
import ProjectList
 from './pages/ProjectsPage/Projects.tsx';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Routes without the navbar */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
          <Route path="/company/register" element={<RegisterCompanyPage />} />
          <Route path="/project_dashboard/:projectId/:userId" element={<ProjectDashboard/>}/>

          {/* Routes with the navbar */}
          <Route path="/" element={<Layout />}>
            <Route path="logged" element={<LoggedPage />} />
            <Route path="tickets" element={<TicketPage />} />
            <Route path="invite" element={<InvitePage />} />
            <Route path='projects' element={<ProjectList />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='dashboard' element={<DashboardPage />} />

          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
