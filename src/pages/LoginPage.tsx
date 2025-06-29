import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((s: RootState) => s.auth.error);
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  React.useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  // Адаптивные размеры
  const formWidth = isMobile ? 320 : isTablet ? 380 : 400;
  const formPadding = isMobile ? '32px 20px' : isTablet ? '40px 28px' : '48px 32px';
  const titleFontSize = isMobile ? 24 : isTablet ? 26 : 28;
  const inputFontSize = isMobile ? 16 : isTablet ? 17 : 18;
  const buttonFontSize = isMobile ? 16 : isTablet ? 17 : 18;
  const borderRadius = isMobile ? 24 : isTablet ? 28 : 32;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Фоновая картинка */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center center / cover no-repeat`,
          zIndex: 1,
        }}
      />
      {/* Слой для затемнения и синего градиента */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(180deg, #e0f0ff 0%, #b3d0e6 100%)',
          opacity: 0.85,
          zIndex: 2,
        }}
      />
      {/* Центрированная форма */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          margin: 'auto',
          width: formWidth,
          maxWidth: '90vw',
          height: 'fit-content',
          borderRadius: borderRadius,
          background: 'rgba(255,255,255,0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          padding: formPadding,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <div style={{ 
          fontSize: titleFontSize, 
          fontWeight: 600, 
          color: '#2a3a4a', 
          marginBottom: isMobile ? 24 : isTablet ? 28 : 32, 
          textAlign: 'center' 
        }}>
          Вход в систему
        </div>
        <input
          type="text"
          placeholder="email/username"
          value={username}
          onChange={e => { setUsername(e.target.value); if (error) dispatch(clearError()); }}
          style={{
            width: '100%',
            marginBottom: isMobile ? 14 : 18,
            padding: isMobile ? '12px 16px' : '14px 18px',
            borderRadius: isMobile ? 12 : 16,
            border: 'none',
            fontSize: inputFontSize,
            background: 'rgba(255,255,255,0.85)',
            outline: 'none',
            boxShadow: '0 1px 4px #0001',
            color: '#111',
          }}
        />
        <input
          type="password"
          placeholder="пароль"
          value={password}
          onChange={e => { setPassword(e.target.value); if (error) dispatch(clearError()); }}
          style={{
            width: '100%',
            marginBottom: isMobile ? 20 : isTablet ? 24 : 28,
            padding: isMobile ? '12px 16px' : '14px 18px',
            borderRadius: isMobile ? 12 : 16,
            border: 'none',
            fontSize: inputFontSize,
            background: 'rgba(255,255,255,0.85)',
            outline: 'none',
            boxShadow: '0 1px 4px #0001',
            color: '#111',
          }}
        />
        {error && (
          <div style={{ 
            color: '#a00', 
            fontWeight: 500, 
            marginBottom: isMobile ? 10 : 12, 
            textAlign: 'center', 
            width: '100%',
            fontSize: isMobile ? 14 : 16,
          }}>
            {error}
          </div>
        )}
        <button
          style={{
            width: '100%',
            padding: isMobile ? '10px 0' : '12px 0',
            borderRadius: isMobile ? 12 : 16,
            border: 'none',
            background: '#fff',
            color: '#2a3a4a',
            fontWeight: 600,
            fontSize: buttonFontSize,
            marginBottom: isMobile ? 10 : 12,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
          onClick={e => {
            e.preventDefault();
            dispatch(login({ username, password }));
          }}
        >
          ВОЙТИ
        </button>
        <button
          style={{
            width: '100%',
            padding: isMobile ? '10px 0' : '12px 0',
            borderRadius: isMobile ? 12 : 16,
            border: 'none',
            background: '#f5f5f5',
            color: '#2a3a4a',
            fontWeight: 600,
            fontSize: isMobile ? 14 : buttonFontSize,
            marginBottom: isMobile ? 14 : 18,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
          onClick={() => {
            // Редирект на Яндекс OAuth
            const clientId = 'fake_yandex_client_id'; // замените на реальный client_id при интеграции
            const redirectUri = `${window.location.origin}/oauth-callback`;
            const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location.href = url;
          }}
        >
          Яндекс <span style={{fontWeight: 700}}>ID</span>
        </button>
        <div style={{ 
          color: '#666', 
          fontSize: isMobile ? 12 : 14, 
          textAlign: 'center', 
          cursor: 'pointer',
          textDecoration: 'underline',
        }}>
          забыли логин или пароль?
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 