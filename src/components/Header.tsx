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
  const [isTablet, setIsTablet] = useState(false);
  const [open, setOpen] = useState(false);
  const userPhoto = useSelector((s: RootState) => s.auth.user?.photo);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerHeight = isMobile ? 60 : isTablet ? 70 : 80;
  const avatarSize = isMobile ? 32 : isTablet ? 48 : 64;
  const menuFontSize = isMobile ? 16 : isTablet ? 18 : 22;
  const menuGap = isMobile ? 0 : isTablet ? 32 : 48;

  return (
    <div style={{
      background: '#8ec3e6',
      height: headerHeight,
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : isTablet ? '0 24px' : '0 32px',
      borderTop: '1px solid #2222',
      borderBottom: '1px solid #2222',
      boxSizing: 'border-box',
      margin: 0,
    }}>
      {isMobile ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <button
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: 8, 
                marginRight: 12, 
                cursor: 'pointer', 
                height: 40, 
                width: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 8,
              }}
              onClick={() => setOpen(o => !o)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect y="4" width="24" height="2" rx="1" fill="#234"/>
                <rect y="11" width="24" height="2" rx="1" fill="#234"/>
                <rect y="18" width="24" height="2" rx="1" fill="#234"/>
              </svg>
            </button>
            <span style={{ fontWeight: 600, fontSize: 18, color: '#234' }}>меню</span>
          </div>
          
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              border: '2px solid #234',
              boxSizing: 'border-box',
              background: '#fff',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
            onClick={() => navigate('/profile')}
          >
            {userPhoto ? (
              <img src={userPhoto} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <svg width={avatarSize * 0.6} height={avatarSize * 0.6} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#b3d0e6" strokeWidth="2" />
                <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#b3d0e6" strokeWidth="2" />
              </svg>
            )}
            <div style={{ 
              position: 'absolute', 
              top: 2, 
              right: 2, 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              background: '#8efc8e', 
              border: '2px solid #fff' 
            }}></div>
          </div>

          {open && (
            <div
              style={{
                position: 'fixed',
                top: headerHeight,
                left: 0,
                width: '100vw',
                background: '#8ec3e6',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '16px 0',
                borderBottom: '1px solid #2222',
              }}
            >
              {menu.map(item => (
                <span
                  key={item.path}
                  style={{
                    cursor: 'pointer',
                    color: location.pathname === item.path ? '#234' : '#234',
                    borderLeft: location.pathname === item.path ? '4px solid #234' : 'none',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    fontSize: 18,
                    padding: '16px 24px',
                    background: location.pathname === item.path ? '#e0f0ff' : 'transparent',
                    transition: 'all 0.2s ease',
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
          <div style={{ 
            display: 'flex', 
            gap: menuGap, 
            fontSize: menuFontSize, 
            color: '#234', 
            fontWeight: 500, 
            justifyContent: 'center', 
            alignItems: 'center', 
            flex: 1,
            marginRight: isTablet ? 16 : 0,
          }}>
            {menu.map(item => (
              <span
                key={item.path}
                style={{
                  cursor: 'pointer',
                  color: location.pathname === item.path ? '#234' : '#234',
                  borderBottom: location.pathname === item.path ? '2px solid #234' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  padding: '8px 4px',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </span>
            ))}
          </div>
          
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              border: '3px solid #234',
              boxSizing: 'border-box',
              background: '#fff',
              cursor: 'pointer',
              position: 'relative',
              right: isTablet ? 0 : '10vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
            onClick={() => navigate('/profile')}
          >
            {userPhoto ? (
              <img src={userPhoto} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <svg width={avatarSize * 0.6} height={avatarSize * 0.6} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#b3d0e6" strokeWidth="2" />
                <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#b3d0e6" strokeWidth="2" />
              </svg>
            )}
            <div style={{ 
              position: 'absolute', 
              top: isTablet ? 6 : 8, 
              right: isTablet ? 6 : 8, 
              width: isTablet ? 14 : 18, 
              height: isTablet ? 14 : 18, 
              borderRadius: '50%', 
              background: '#8efc8e', 
              border: '2.5px solid #fff' 
            }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header; 