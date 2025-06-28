import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../authSlice';

const OauthCallbackPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Получаем code из query params
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      // Мокаем обмен code на токен и получение профиля
      setTimeout(() => {
        // Мокаем профиль пользователя Яндекса
        dispatch(login({ username: 'yandex_user', password: 'oauth', oauth: true }));
        navigate('/');
      }, 800);
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, location.search]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: 22, color: '#234' }}>
      Вход через Яндекс ID...
    </div>
  );
};

export default OauthCallbackPage; 