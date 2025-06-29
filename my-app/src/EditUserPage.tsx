import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Состояние формы
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'active' | 'blocked'>('active');
  const [organization, setOrganization] = useState('');
  const [newOrg, setNewOrg] = useState('');

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

  // Инициализация формы при загрузке пользователя
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setStatus(user.status);
      setOrganization(user.organization || '');
    }
  }, [user]);

  // Адаптивные размеры
  const headerHeight = isMobile ? 60 : isTablet ? 70 : 80;
  const formWidth = isMobile ? '95vw' : isTablet ? 500 : 600;
  const formPadding = isMobile ? '24px 20px' : isTablet ? '32px 28px' : '40px 36px';
  const borderRadius = isMobile ? 16 : isTablet ? 20 : 24;
  const inputPadding = isMobile ? '12px 16px' : '14px 18px';
  const fontSize = isMobile ? 14 : isTablet ? 15 : 16;

  if (!user) {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.35)',
          borderRadius: borderRadius,
          padding: formPadding,
          textAlign: 'center',
          fontSize: isMobile ? 18 : isTablet ? 20 : 24,
          fontWeight: 500,
          color: '#2a3a4a',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}>
          Пользователь не найден
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const org = newOrg || organization;
    if (newOrg) dispatch(addOrganization(newOrg));
    dispatch(editUser({ ...user, username, status, organization: org }));
    navigate('/users');
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255,255,255,0.35)',
        borderRadius: borderRadius,
        padding: formPadding,
        width: formWidth,
        maxWidth: '95vw',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 16 : 20,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 8,
          fontSize: isMobile ? 20 : isTablet ? 24 : 28,
          fontWeight: 600,
          color: '#2a3a4a',
        }}>
          Редактировать пользователя
        </h2>
        
        <input 
          value={user.id} 
          disabled 
          style={{
            padding: inputPadding,
            borderRadius: isMobile ? 12 : 16,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.4)',
            fontSize: fontSize,
            outline: 'none',
            color: '#666',
            cursor: 'not-allowed',
          }} 
        />
        
        <input 
          placeholder="Имя пользователя" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
          style={{
            padding: inputPadding,
            borderRadius: isMobile ? 12 : 16,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.8)',
            fontSize: fontSize,
            outline: 'none',
            color: '#234',
          }} 
        />
        
        <select 
          value={status} 
          onChange={e => setStatus(e.target.value as 'active' | 'blocked')} 
          style={{
            padding: inputPadding,
            borderRadius: isMobile ? 12 : 16,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.8)',
            fontSize: fontSize,
            outline: 'none',
            color: '#234',
          }}
        >
          <option value="active">Активен</option>
          <option value="blocked">Заблокирован</option>
        </select>
        
        <div style={{display: 'flex', gap: isMobile ? 8 : 12, flexDirection: isMobile ? 'column' : 'row'}}>
          <select 
            value={organization} 
            onChange={e => setOrganization(e.target.value)} 
            style={{
              flex: 1,
              padding: inputPadding,
              borderRadius: isMobile ? 12 : 16,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.8)',
              fontSize: fontSize,
              outline: 'none',
              color: '#234',
            }}
          >
            <option value="">--Выберите организацию--</option>
            {organizations.map(org => <option key={org} value={org}>{org}</option>)}
          </select>
          
          <input 
            placeholder="или новая организация" 
            value={newOrg} 
            onChange={e => setNewOrg(e.target.value)} 
            style={{
              flex: 1,
              padding: inputPadding,
              borderRadius: isMobile ? 12 : 16,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.8)',
              fontSize: fontSize,
              outline: 'none',
              color: '#234',
            }} 
          />
        </div>
        
        <div style={{
          display: 'flex', 
          gap: isMobile ? 8 : 12, 
          marginTop: isMobile ? 8 : 12,
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <button 
            type="submit" 
            style={{
              flex: 1, 
              background: '#8ec3e6', 
              color: '#234', 
              border: 'none', 
              borderRadius: isMobile ? 12 : 16, 
              padding: isMobile ? '12px 0' : '14px 0', 
              fontWeight: 600, 
              cursor: 'pointer',
              fontSize: fontSize,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            Сохранить
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/users')} 
            style={{
              flex: 1, 
              background: 'rgba(255,255,255,0.6)', 
              color: '#234', 
              border: 'none', 
              borderRadius: isMobile ? 12 : 16, 
              padding: isMobile ? '12px 0' : '14px 0', 
              fontWeight: 500, 
              cursor: 'pointer',
              fontSize: fontSize,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage; 