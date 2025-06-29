import { Routes, Route } from 'react-router-dom';
import UsersPage from './UsersPage';
import AddUserPage from './AddUserPage';
import EditUserPage from './EditUserPage';
import ProfilePage from './ProfilePage';
import LoginPage from './pages/LoginPage';
import OauthCallbackPage from './pages/OauthCallbackPage';
import MainPage from './pages/MainPage';
import Header from './components/Header';

function withHeader(Component: React.FC) {
  return function Wrapped() {
    return <><Header /><Component /></>;
  };
}

function App() {
  return (
    <Routes>
      <Route path="/" element={withHeader(MainPage)()} />
      <Route path="/users" element={withHeader(UsersPage)()} />
      <Route path="/users/add" element={withHeader(AddUserPage)()} />
      <Route path="/users/edit/:id" element={withHeader(EditUserPage)()} />
      <Route path="/profile" element={withHeader(ProfilePage)()} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-callback" element={<OauthCallbackPage />} />
    </Routes>
  );
}

export default App;
