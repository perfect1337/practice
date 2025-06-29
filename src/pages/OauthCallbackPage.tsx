import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../authSlice';

const OauthCallbackPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('Вход через Яндекс ID...');

  useEffect(() => {
    // Получаем code из query params
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      // Мокаем обмен code на токен и получение профиля
      setTimeout(() => {
        // Мокаем профиль пользователя Яндекса
        dispatch(login({ username: 'yandex_user', password: 'oauth', oauth: true }));
        setMessage('Успешный вход! Перенаправление...');
        setTimeout(() => {
          setMessage('');
          navigate('/');
        }, 3000);
      }, 800);
    } else {
      setMessage('Ошибка авторизации! Перенаправление...');
      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 3000);
    }
  }, [dispatch, navigate, location.search]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: 22, color: '#234' }}>
      {message}
    </div>
  );
};

export default OauthCallbackPage; 