import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, addOrganization } from './usersSlice';
import type { AppDispatch, RootState } from './store';

const EditUserPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.users.users.find(u => u.id === id));
  const organizations = useSelector((s: RootState) => s.users.organizations);
  const [username, setUsername] = useState(user?.username || '');
  const [status, setStatus] = useState<'active' | 'blocked'>(user?.status || 'active');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [newOrg, setNewOrg] = useState('');

  if (!user) return <div style={{padding: 40}}>Пользователь не найден</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const org = newOrg || organization;
    if (newOrg) dispatch(addOrganization(newOrg));
    dispatch(editUser({ ...user, username, status, organization: org }));
    navigate('/users');
  };

  return (
    <div style={{background: '#e6e6e6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <form onSubmit={handleSubmit} style={{background: '#fff', borderRadius: 24, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #0001', display: 'flex', flexDirection: 'column', gap: 16, width: 400}}>
        <h2 style={{textAlign: 'center', marginBottom: 8}}>Редактировать пользователя</h2>
        <input value={user.id} disabled style={{padding: 10, borderRadius: 8, border: '1px solid #ccc', background: '#f3f3f3'}} />
        <input placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} required style={{padding: 10, borderRadius: 8, border: '1px solid #ccc'}} />
        <select value={status} onChange={e => setStatus(e.target.value as 'active' | 'blocked')} style={{padding: 10, borderRadius: 8, border: '1px solid #ccc'}}>
          <option value="active">Активен</option>
          <option value="blocked">Заблокирован</option>
        </select>
        <div style={{display: 'flex', gap: 8}}>
          <select value={organization} onChange={e => setOrganization(e.target.value)} style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc'}}>
            <option value="">--Выберите организацию--</option>
            {organizations.map(org => <option key={org} value={org}>{org}</option>)}
          </select>
          <input placeholder="или новая организация" value={newOrg} onChange={e => setNewOrg(e.target.value)} style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc'}} />
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          <button type="submit" style={{flex: 1, background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '10px 0', fontWeight: 500, cursor: 'pointer'}}>Сохранить</button>
          <button type="button" onClick={() => navigate('/users')} style={{flex: 1, background: '#eee', color: '#234', border: 'none', borderRadius: 12, padding: '10px 0', fontWeight: 500, cursor: 'pointer'}}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage; 