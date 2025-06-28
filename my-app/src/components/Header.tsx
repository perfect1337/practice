import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      padding: '0 16px',
      borderTop: '1px solid #2222',
      borderBottom: '1px solid #2222',
      boxSizing: 'border-box',
      margin: 0,
    }}>
      {isMobile ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <button
              style={{ background: 'none', border: 'none', padding: 0, marginRight: 12, cursor: 'pointer', height: 32, width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setOpen(o => !o)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect y="4" width="24" height="2" rx="1" fill="#234"/><rect y="11" width="24" height="2" rx="1" fill="#234"/><rect y="18" width="24" height="2" rx="1" fill="#234"/></svg>
            </button>
            <span style={{ fontWeight: 600, fontSize: 18, color: '#234' }}>меню</span>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid #234',
              boxSizing: 'border-box',
              background: '#fff',
              cursor: 'pointer',
              position: 'relative',
              marginLeft: 8,
            }}
            onClick={() => navigate('/profile')}
          >
            <div style={{ position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#8efc8e', border: '2px solid #fff' }}></div>
          </div>
          {open && (
            <div
              style={{
                position: 'fixed',
                top: 48,
                left: 0,
                width: '100vw',
                background: '#8ec3e6',
                boxShadow: '0 2px 16px #0002',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '12px 0',
              }}
            >
              {menu.map(item => (
                <span
                  key={item.path}
                  style={{
                    cursor: 'pointer',
                    color: location.pathname === item.path ? '#234' : '#234',
                    borderLeft: location.pathname === item.path ? '4px solid #234' : 'none',
                    fontWeight: 500,
                    fontSize: 18,
                    padding: '12px 24px',
                    background: location.pathname === item.path ? '#e0f0ff' : 'transparent',
                  }}
                  onClick={() => {
                    setOpen(false);
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
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
            <div style={{ position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#8efc8e', border: '2px solid #fff' }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header; 