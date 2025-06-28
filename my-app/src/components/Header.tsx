import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

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
  const userPhoto = useSelector((s: RootState) => s.auth.user?.photo);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      background: '#8ec3e6',
      height: 80,
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
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
          <div style={{ display: 'flex', gap: 48, fontSize: 22, color: '#234', fontWeight: 500, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {menu.map(item => (
              <span
                key={item.path}
                style={{
                  cursor: 'pointer',
                  color: location.pathname === item.path ? '#234' : '#234',
                  borderBottom: location.pathname === item.path ? '2px solid #234' : 'none',
                  textDecoration: 'none',
                  transition: 'border 0.2s',
                  textAlign: 'center',
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '3px solid #234',
              boxSizing: 'border-box',
              background: '#fff',
              cursor: 'pointer',
              position: 'absolute',
              right: '10vw',
              top: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => navigate('/profile')}
          >
            {userPhoto ? (
              <img src={userPhoto} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#b3d0e6" strokeWidth="2" />
                <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#b3d0e6" strokeWidth="2" />
              </svg>
            )}
            <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: '#8efc8e', border: '2.5px solid #fff' }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header; 