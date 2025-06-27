import React, { useState } from 'react';
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

  React.useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

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
          width: 400,
          maxWidth: '90vw',
          height: 'fit-content',
          borderRadius: 32,
          background: 'rgba(255,255,255,0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          padding: '48px 32px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, color: '#2a3a4a', marginBottom: 32, textAlign: 'center' }}>
          Вход в систему
        </div>
        <input
          type="text"
          placeholder="email/username"
          value={username}
          onChange={e => { setUsername(e.target.value); if (error) dispatch(clearError()); }}
          style={{
            width: '100%',
            marginBottom: 18,
            padding: '14px 18px',
            borderRadius: 16,
            border: 'none',
            fontSize: 18,
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
            marginBottom: 28,
            padding: '14px 18px',
            borderRadius: 16,
            border: 'none',
            fontSize: 18,
            background: 'rgba(255,255,255,0.85)',
            outline: 'none',
            boxShadow: '0 1px 4px #0001',
            color: '#111',
          }}
        />
        {error && (
          <div style={{ color: '#a00', fontWeight: 500, marginBottom: 12, textAlign: 'center', width: '100%' }}>{error}</div>
        )}
        <button
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 16,
            border: 'none',
            background: '#fff',
            color: '#2a3a4a',
            fontWeight: 600,
            fontSize: 18,
            marginBottom: 12,
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
            padding: '12px 0',
            borderRadius: 16,
            border: 'none',
            background: '#f5f5f5',
            color: '#2a3a4a',
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 18,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
        >
          Яндекс <span style={{fontWeight: 700}}>ID</span>
        </button>
        <div style={{ color: '#2a3a4a', fontSize: 15, marginTop: 8, opacity: 0.8, textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}>
          забыли логин или пароль?
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 