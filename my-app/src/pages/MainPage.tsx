import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#234' }}>Главная</h1>
      <div style={{ marginTop: 24, color: '#555', fontSize: 20 }}>
        Добро пожаловать в админ-панель!
      </div>
    </div>
  );
};

export default MainPage; 