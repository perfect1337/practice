import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { blockUser, unblockUser, addUser, editUser } from './usersSlice';
import { useNavigate } from 'react-router-dom';

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.18)',
};
const modalContentStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.35)',
  borderRadius: 40,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  width: 420,
  maxWidth: '95vw',
  padding: '32px 32px 24px 32px',
  position: 'relative',
  zIndex: 101,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};

const UsersPage: React.FC = () => {
  const users = useSelector((s: RootState) => s.users.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<null | { type: 'add' } | { type: 'edit', userId: string }>(null);

  // Фильтрация по ФИО или ID
  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  // Модальное добавление/редактирование
  const [form, setForm] = useState<{ id: string; username: string; status: 'active' | 'blocked'; role: 'admin'; organization: string }>({ id: '', username: '', status: 'active', role: 'admin', organization: '' });
  React.useEffect(() => {
    if (modal && modal.type === 'edit') {
      const user = users.find(u => u.id === modal.userId);
      if (user) setForm({ ...user, status: user.status || 'active', role: user.role || 'admin', organization: user.organization || '' });
    } else if (modal && modal.type === 'add') {
      setForm({ id: '', username: '', status: 'active', role: 'admin', organization: '' });
    }
  }, [modal, users]);

  const handleSave = () => {
    if (modal?.type === 'add') {
      dispatch(addUser({ ...form }));
    } else if (modal?.type === 'edit') {
      dispatch(editUser({ ...form }));
    }
    setModal(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
    }}>
      {/* Фоновая картинка */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center center / cover no-repeat`,
          zIndex: 0,
        }}
      />
      <div style={{
        background: 'rgba(255,255,255,0.35)',
        borderRadius: 40,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        width: 1100,
        maxWidth: '98vw',
        padding: '32px 32px 32px 32px',
        zIndex: 2,
        margin: 0,
      }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: '#2a3a4a', marginBottom: 18 }}>Пользователи</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="поиск по ID, ФИО"
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: 16,
              border: 'none',
              fontSize: 18,
              background: 'rgba(200,230,255,0.45)',
              color: '#234',
              outline: 'none',
              marginRight: 12,
              boxShadow: '0 1px 4px #0001',
            }}
          />
          <span style={{ fontSize: 26, color: '#2a3a4a', opacity: 0.7, cursor: 'pointer', marginRight: 8 }}>&#128269;</span>
          <span style={{ fontSize: 22, color: '#2a3a4a', opacity: 0.7, cursor: 'pointer' }}>&#128465;</span>
        </div>
        <div style={{
          borderRadius: 24,
          overflow: 'hidden',
          background: 'rgba(200,230,255,0.35)',
          border: '1.5px solid rgba(255,255,255,0.18)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'rgba(200,230,255,0.25)' }}>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left' }}>ФИО</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left' }}>Статус</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left' }}>Роль</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left' }}>Организация</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, fontSize: 17, color: '#2a3a4a', border: 'none', textAlign: 'left', minWidth: 260 }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: '#888', fontSize: 18 }}>Нет пользователей</td>
                </tr>
              ) : (
                filtered.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #b3d0e6', background: 'rgba(255,255,255,0.15)' }}>
                    <td style={{ padding: '12px 10px', fontSize: 16, color: '#234', minWidth: 160 }}>{u.username}</td>
                    <td style={{ padding: '12px 10px', fontSize: 16, color: '#234', minWidth: 120 }}>{u.id}</td>
                    <td style={{ padding: '12px 10px', fontSize: 16, fontWeight: 500, color: u.status === 'active' ? '#1bbf1b' : '#d33', minWidth: 120 }}>{u.status === 'active' ? 'активен' : 'заблокирован'}</td>
                    <td style={{ padding: '12px 10px', fontSize: 16, color: '#234', minWidth: 120 }}>{u.role || 'диспетчер'}</td>
                    <td style={{ padding: '12px 10px', fontSize: 16, color: '#234', minWidth: 120 }}>{u.organization || 'не задана'}</td>
                    <td style={{ padding: '12px 10px', minWidth: 260 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}
                          onClick={() => setModal({ type: 'edit', userId: u.id })}
                        >
                          редактировать
                        </button>
                        <button
                          style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}
                          onClick={() => setModal({ type: 'add' })}
                        >
                          добавить
                        </button>
                        {u.status === 'active' ? (
                          <button
                            style={{ background: '#ffe6b3', color: '#a66a00', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}
                            onClick={() => dispatch(blockUser(u.id))}
                          >
                            заблокировать
                          </button>
                        ) : (
                          <button
                            style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}
                            onClick={() => dispatch(unblockUser(u.id))}
                          >
                            разблокировать
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Модальное окно */}
      {modal && (
        <div style={modalStyle} onClick={() => setModal(null)}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#2a3a4a', marginBottom: 18, textAlign: 'center' }}>
              {modal.type === 'add' ? 'Добавить пользователя' : 'Редактировать пользователя'}
            </div>
            <input
              placeholder="ID"
              value={form.id}
              onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
              style={{ marginBottom: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #b3d0e6', fontSize: 16 }}
            />
            <input
              placeholder="ФИО"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              style={{ marginBottom: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #b3d0e6', fontSize: 16 }}
            />
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as 'active' | 'blocked' }))}
              style={{ marginBottom: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #b3d0e6', fontSize: 16 }}
            >
              <option value="active">активен</option>
              <option value="blocked">заблокирован</option>
            </select>
            <input type="hidden" value={form.role} readOnly />
            <input
              placeholder="Организация"
              value={form.organization}
              onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
              style={{ marginBottom: 18, padding: '12px 14px', borderRadius: 12, border: '1px solid #b3d0e6', fontSize: 16 }}
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                style={{ flex: 1, background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '12px 0', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                style={{ flex: 1, background: '#eee', color: '#234', border: 'none', borderRadius: 12, padding: '12px 0', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                onClick={() => setModal(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage; 