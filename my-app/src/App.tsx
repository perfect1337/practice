import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import UsersPage from './UsersPage';
import AddUserPage from './AddUserPage';
import EditUserPage from './EditUserPage';
import ProfilePage from './ProfilePage';

function MainPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#d3d3d3' }}>
      <div style={{ background: '#8ec3e6', height: 48, display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between', borderTop: '1px solid #2222', borderBottom: '1px solid #2222' }}>
        <div style={{ display: 'flex', gap: 32, fontSize: 18, color: '#234', fontWeight: 500 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#234' }}>главная</Link>
          <Link to="/users" style={{ textDecoration: 'none', color: '#234' }}>пользователи</Link>
          <span style={{ cursor: 'pointer', color: '#234' }}>маршруты</span>
          <span style={{ cursor: 'pointer', color: '#234' }}>организации</span>
          <span style={{ cursor: 'pointer', color: '#234' }}>транспорт</span>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #234', boxSizing: 'border-box', background: '#fff', cursor: 'pointer' }} onClick={() => navigate('/profile')} />
      </div>
      <div style={{ padding: 0, margin: 0, minHeight: '100vh' }}>
        <div style={{ margin: '60px auto 0 auto', width: 800 }}>
          <div style={{ background: '#fdfaf2', borderRadius: 48, minHeight: 240, position: 'relative', marginBottom: 40, boxSizing: 'border-box', padding: 0 }}>
            <div style={{ position: 'absolute', top: 24, right: 32, fontSize: 20, color: '#888', cursor: 'pointer' }}>
              <span role="img" aria-label="filter">&#128269;</span>
            </div>
          </div>
          <div style={{ fontWeight: 500, marginBottom: 12, marginLeft: 8 }}>Быстрые действия &gt;</div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 32, marginLeft: 8 }}>
            <div style={{ width: 140, height: 140, background: '#fdfaf2', borderRadius: 32 }}></div>
            <div style={{ width: 140, height: 140, background: '#fdfaf2', borderRadius: 32 }}></div>
            <div style={{ width: 140, height: 140, background: '#fdfaf2', borderRadius: 32 }}></div>
          </div>
          <div style={{ fontWeight: 500, marginBottom: 12, marginLeft: 8 }}>Последние действия на сайте:</div>
          <div style={{ width: 220, height: 60, background: '#d6f0ff', borderRadius: 32, marginLeft: 8 }}></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/users/*" element={<UsersPage />} />
      <Route path="/users/add" element={<AddUserPage />} />
      <Route path="/users/edit/:id" element={<EditUserPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
