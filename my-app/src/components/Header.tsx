import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menu = [
  { label: 'главная', path: '/' },
  { label: 'пользователи', path: '/users' },
  { label: 'маршруты', path: '/routes' },
  { label: 'организации', path: '/organizations' },
  { label: 'транспорт', path: '/transport' },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{
      background: '#8ec3e6',
      height: 48,
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      borderTop: '1px solid #2222',
      borderBottom: '1px solid #2222',
      boxSizing: 'border-box',
      margin: 0,
    }}>
      <div style={{ display: 'flex', gap: 32, fontSize: 18, color: '#234', fontWeight: 500 }}>
        {menu.map(item => (
          <span
            key={item.path}
            style={{
              cursor: 'pointer',
              color: location.pathname === item.path ? '#234' : '#234',
              borderBottom: location.pathname === item.path ? '2px solid #234' : 'none',
              textDecoration: 'none',
              transition: 'border 0.2s',
            }}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div
        style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #234', boxSizing: 'border-box', background: '#fff', cursor: 'pointer', position: 'relative', marginLeft: 32 }}
        onClick={() => navigate('/profile')}
      >
        <div style={{position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#8efc8e', border: '2px solid #fff'}}></div>
      </div>
    </div>
  );
};

export default Header; 