import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { blockUser, unblockUser, addUser, editUser } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.18)',
  padding: '16px',
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((s: RootState) => s.users.users);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ type: 'add' | 'edit'; user?: any } | null>(null);
  const [form, setForm] = useState({ id: '', username: '', status: 'active' as 'active' | 'blocked', role: 'user' });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Адаптивные размеры
  const headerHeight = isMobile ? 60 : isTablet ? 70 : 80;
  const containerMaxWidth = isMobile ? '98vw' : isTablet ? '95vw' : 1100;
  const containerPadding = isMobile ? '16px 12px' : isTablet ? '24px 20px' : '32px 32px';
  const borderRadius = isMobile ? 20 : isTablet ? 28 : 40;
  const titleFontSize = isMobile ? 20 : isTablet ? 24 : 26;
  const inputFontSize = isMobile ? 16 : isTablet ? 17 : 18;

  const filtered = users.filter(u => 
    u.id.toLowerCase().includes(search.toLowerCase()) || 
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (modal?.type === 'add') {
      dispatch(addUser(form));
    } else if (modal?.type === 'edit' && modal.user) {
      dispatch(editUser({ id: modal.user.id, ...form }));
    }
    setModal(null);
    setForm({ id: '', username: '', status: 'active', role: 'user' });
  };

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      minWidth: '100vw',
      minHeight: '100vh',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #8ec3e6 0%, #b3d0e6 100%)',
      overflowX: 'hidden',
      padding: 0,
      margin: 0,
      paddingTop: headerHeight + 16,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      zIndex: 0,
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.35)',
          borderRadius: borderRadius,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          width: containerMaxWidth,
          maxWidth: '98vw',
          padding: containerPadding,
          zIndex: 2,
          margin: 0,
        }}>
          <div style={{ fontSize: titleFontSize, fontWeight: 600, color: '#2a3a4a', marginBottom: 18 }}>Пользователи</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, gap: 12 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="поиск по ID, ФИО"
              style={{
                flex: 1,
                padding: isMobile ? '12px 16px' : '14px 18px',
                borderRadius: isMobile ? 12 : 16,
                border: 'none',
                fontSize: inputFontSize,
                background: 'rgba(200,230,255,0.45)',
                color: '#234',
                outline: 'none',
                boxShadow: '0 1px 4px #0001',
              }}
            />
            <span style={{ 
              fontSize: isMobile ? 20 : isTablet ? 24 : 26, 
              color: '#2a3a4a', 
              opacity: 0.7, 
              cursor: 'pointer', 
              padding: '8px',
            }}>
              &#128269;
            </span>
            <span style={{ 
              fontSize: isMobile ? 18 : isTablet ? 20 : 22, 
              color: '#2a3a4a', 
              opacity: 0.7, 
              cursor: 'pointer',
              padding: '8px',
            }}>
              &#128465;
            </span>
          </div>
          
          <div style={{
            borderRadius: isMobile ? 16 : 24,
            overflow: 'hidden',
            background: 'rgba(200,230,255,0.35)',
            border: '1.5px solid rgba(255,255,255,0.18)',
          }}>
            {isMobile ? (
              // Мобильная версия таблицы
              <div style={{ padding: '12px' }}>
                {filtered.map(u => (
                  <div key={u.id} style={{
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: 12,
                    padding: '16px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, fontSize: 16, color: '#2a3a4a' }}>{u.username}</div>
                      <div style={{ 
                        fontSize: 12, 
                        color: u.status === 'active' ? '#8efc8e' : '#ff6b6b',
                        fontWeight: 500,
                      }}>
                        {u.status === 'active' ? 'активен' : 'заблокирован'}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>ID: {u.id}</div>
                    <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>Роль: {u.role}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        style={{
                          background: u.status === 'active' ? '#ff6b6b' : '#8efc8e',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 12px',
                          fontSize: 12,
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                        onClick={() => dispatch(u.status === 'active' ? blockUser(u.id) : unblockUser(u.id))}
                      >
                        {u.status === 'active' ? 'заблокировать' : 'разблокировать'}
                      </button>
                      <button
                        style={{
                          background: '#8ec3e6',
                          color: '#234',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 12px',
                          fontSize: 12,
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                        onClick={() => navigate(`/users/edit/${u.id}`)}
                      >
                        редактировать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Десктопная и планшетная версия таблицы
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: 'rgba(200,230,255,0.25)' }}>
                    <th style={{ 
                      padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                      fontWeight: 500, 
                      fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                      color: '#2a3a4a', 
                      border: 'none', 
                      textAlign: 'left' 
                    }}>
                      ФИО
                    </th>
                    <th style={{ 
                      padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                      fontWeight: 500, 
                      fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                      color: '#2a3a4a', 
                      border: 'none', 
                      textAlign: 'left' 
                    }}>
                      ID
                    </th>
                    <th style={{ 
                      padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                      fontWeight: 500, 
                      fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                      color: '#2a3a4a', 
                      border: 'none', 
                      textAlign: 'left' 
                    }}>
                      Статус
                    </th>
                    <th style={{ 
                      padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                      fontWeight: 500, 
                      fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                      color: '#2a3a4a', 
                      border: 'none', 
                      textAlign: 'left' 
                    }}>
                      Роль
                    </th>
                    <th style={{ 
                      padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                      fontWeight: 500, 
                      fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                      color: '#2a3a4a', 
                      border: 'none', 
                      textAlign: 'left', 
                      minWidth: isTablet ? 200 : 260 
                    }}>
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} style={{ background: 'rgba(255,255,255,0.6)' }}>
                      <td style={{ 
                        padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                        fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                        color: '#2a3a4a' 
                      }}>
                        {u.username}
                      </td>
                      <td style={{ 
                        padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                        fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                        color: '#2a3a4a' 
                      }}>
                        {u.id}
                      </td>
                      <td style={{ 
                        padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                        fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                        color: u.status === 'active' ? '#8efc8e' : '#ff6b6b',
                        fontWeight: 500,
                      }}>
                        {u.status === 'active' ? 'активен' : 'заблокирован'}
                      </td>
                      <td style={{ 
                        padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                        fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                        color: '#2a3a4a' 
                      }}>
                        {u.role}
                      </td>
                      <td style={{ 
                        padding: isMobile ? '8px 6px' : isTablet ? '10px 8px' : '12px 10px', 
                        fontSize: isMobile ? 14 : isTablet ? 15 : 17, 
                        color: '#2a3a4a' 
                      }}>
                        <div style={{ display: 'flex', gap: isMobile ? 4 : isTablet ? 6 : 8, flexWrap: 'wrap' }}>
                          <button
                            style={{
                              background: u.status === 'active' ? '#ff6b6b' : '#8efc8e',
                              color: '#fff',
                              border: 'none',
                              borderRadius: isMobile ? 6 : 8,
                              padding: isMobile ? '4px 8px' : isTablet ? '6px 10px' : '8px 12px',
                              fontSize: isMobile ? 12 : isTablet ? 13 : 14,
                              cursor: 'pointer',
                              fontWeight: 500,
                            }}
                            onClick={() => dispatch(u.status === 'active' ? blockUser(u.id) : unblockUser(u.id))}
                          >
                            {u.status === 'active' ? 'заблокировать' : 'разблокировать'}
                          </button>
                          <button
                            style={{
                              background: '#8ec3e6',
                              color: '#234',
                              border: 'none',
                              borderRadius: isMobile ? 6 : 8,
                              padding: isMobile ? '4px 8px' : isTablet ? '6px 10px' : '8px 12px',
                              fontSize: isMobile ? 12 : isTablet ? 13 : 14,
                              cursor: 'pointer',
                              fontWeight: 500,
                            }}
                            onClick={() => navigate(`/users/edit/${u.id}`)}
                          >
                            редактировать
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* Модальное окно */}
      {modal && (
        <div style={modalStyle} onClick={() => setModal(null)}>
          <div style={{
            ...modalContentStyle,
            width: isMobile ? 320 : isTablet ? 380 : 420,
            padding: isMobile ? '24px 20px' : isTablet ? '28px 24px' : '32px 32px',
            borderRadius: isMobile ? 24 : isTablet ? 32 : 40,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ 
              fontSize: isMobile ? 18 : isTablet ? 20 : 22, 
              fontWeight: 600, 
              color: '#2a3a4a', 
              marginBottom: 18, 
              textAlign: 'center' 
            }}>
              {modal.type === 'add' ? 'Добавить пользователя' : 'Редактировать пользователя'}
            </div>
            <input
              placeholder="ID"
              value={form.id}
              onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
              style={{ 
                marginBottom: 12, 
                padding: isMobile ? '10px 12px' : '12px 14px', 
                borderRadius: isMobile ? 10 : 12, 
                border: '1px solid #b3d0e6', 
                fontSize: isMobile ? 14 : 16 
              }}
            />
            <input
              placeholder="ФИО"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              style={{ 
                marginBottom: 12, 
                padding: isMobile ? '10px 12px' : '12px 14px', 
                borderRadius: isMobile ? 10 : 12, 
                border: '1px solid #b3d0e6', 
                fontSize: isMobile ? 14 : 16 
              }}
            />
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as 'active' | 'blocked' }))}
              style={{ 
                marginBottom: 12, 
                padding: isMobile ? '10px 12px' : '12px 14px', 
                borderRadius: isMobile ? 10 : 12, 
                border: '1px solid #b3d0e6', 
                fontSize: isMobile ? 14 : 16 
              }}
            >
              <option value="active">активен</option>
              <option value="blocked">заблокирован</option>
            </select>
            <input type="hidden" value={form.role} readOnly />
            <button
              style={{
                background: '#8ec3e6',
                color: '#234',
                border: 'none',
                borderRadius: isMobile ? 10 : 12,
                padding: isMobile ? '10px 0' : '12px 0',
                fontWeight: 600,
                fontSize: isMobile ? 14 : 16,
                cursor: 'pointer',
                marginTop: 8,
              }}
              onClick={handleSubmit}
            >
              {modal.type === 'add' ? 'добавить' : 'сохранить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage; 