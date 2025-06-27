import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#234' }}>Профиль</h1>
      <div style={{ marginTop: 24, color: '#555', fontSize: 20 }}>
        Здесь будет информация о профиле пользователя.
      </div>
    </div>
  );
};

export default ProfilePage; 