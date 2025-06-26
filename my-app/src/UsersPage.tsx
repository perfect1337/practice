import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { blockUser, unblockUser, removeUser } from './usersSlice';
import type { User } from './usersSlice';
import { useNavigate } from 'react-router-dom';

const tableStyle: React.CSSProperties = {
  width: '100%',
  background: '#fdfaf2',
  borderRadius: 24,
  marginTop: 24,
  borderCollapse: 'separate',
  borderSpacing: 0,
  boxShadow: '0 2px 16px #0001',
};
const thStyle: React.CSSProperties = {
  background: '#e0f0ff',
  color: '#234',
  fontWeight: 600,
  fontSize: 16,
  padding: '12px 16px',
  textAlign: 'left',
};
const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: 15,
  color: '#222',
  background: '#fdfaf2',
};
const btnStyle: React.CSSProperties = {
  background: '#8ec3e6',
  color: '#234',
  border: 'none',
  borderRadius: 12,
  padding: '8px 16px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const btnDanger: React.CSSProperties = {
  ...btnStyle,
  background: '#ffd6d6',
  color: '#a00',
};
const btnBlock: React.CSSProperties = {
  ...btnStyle,
  background: '#ffe6b3',
  color: '#a66a00',
};

const UsersPage: React.FC = () => {
  const users = useSelector((s: RootState) => s.users.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div style={{padding: 40, background: '#e6e6e6', minHeight: '100vh'}}>
      <div style={{display: 'flex', gap: 12, marginBottom: 16}}>
        <button onClick={() => navigate('/')} style={btnStyle}>На главную</button>
        <button onClick={() => navigate('/users/add')} style={btnStyle}>Добавить пользователя</button>
      </div>
      <div style={{maxWidth: 900, margin: '0 auto'}}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Имя</th>
              <th style={thStyle}>Статус</th>
              <th style={thStyle}>Организация</th>
              <th style={thStyle}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={tdStyle}>{u.id}</td>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.status === 'active' ? 'Активен' : 'Заблокирован'}</td>
                <td style={tdStyle}>{u.organization || '-'}</td>
                <td style={{...tdStyle, display: 'flex', gap: 8, background: 'none'}}>
                  <button style={btnStyle} onClick={() => navigate(`/users/edit/${u.id}`)}>Редактировать</button>
                  {u.status === 'active' ? (
                    <button style={btnBlock} onClick={() => dispatch(blockUser(u.id))}>Заблокировать</button>
                  ) : (
                    <button style={btnStyle} onClick={() => dispatch(unblockUser(u.id))}>Разблокировать</button>
                  )}
                  <button style={btnDanger} onClick={() => dispatch(removeUser(u.id))}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage; 