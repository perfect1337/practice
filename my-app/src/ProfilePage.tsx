import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './authSlice';
import type { RootState } from './store';

const mockOrganizations = ['Org1', 'Org2', 'Org3'];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // MOCK user state
  const [photo, setPhoto] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [org, setOrg] = useState('');
  const [orgEdit, setOrgEdit] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // MOCK user info
  const user = {
    name: 'name',
    role: 'администратор',
    registered: '01.01.2024',
    employeeId: '123456',
    status: 'активен',
    activity: [
      '26.06 14:30 – Редактирование маршрута №8',
      '26.06 12:15 – Блокировка пользователя Иванов А.',
      '26.06 14:30 – Редактирование маршрута №8',
      '26.06 12:15 – Блокировка пользователя Иванов А.',
      '26.06 14:30 – Редактирование маршрута №8',
    ],
  };

  // MOCK API actions
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ev => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleEmailSave = () => {
    setEmail(emailInput);
    setEmailEdit(false);
    setMessage('Email сохранён!');
  };
  const handlePasswordSave = () => {
    setPasswordEdit(false);
    setOldPassword('');
    setNewPassword('');
    setShowPasswordSuccess(true);
    setTimeout(() => setShowPasswordSuccess(false), 3000);
  };
  const handleOrgSave = () => {
    setOrg(org);
    setOrgEdit(false);
    setMessage('Организация привязана!');
  };
  const handleDeactivate = () => {
    setDeactivate(false);
    setMessage('Аккаунт деактивирован!');
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <div
      style={{
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
        paddingTop: 48,
        fontFamily: 'Segoe UI, Arial, sans-serif',
        zIndex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Уведомление об успешной смене пароля */}
      {showPasswordSuccess && (
        <div style={{
          position: 'fixed',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#8ec3e6',
          color: '#444',
          borderRadius: 32,
          padding: '32px 24px',
          fontSize: 22,
          fontWeight: 500,
          textAlign: 'center',
          zIndex: 2000,
          minWidth: 280,
          maxWidth: '90vw',
          boxShadow: '0 2px 16px #0002',
        }}>
          Готово!<br />Пароль успешно изменен.
        </div>
      )}
      {/* Модалка смены пароля */}
      {passwordEdit && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1500,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#444',
            borderRadius: 40,
            padding: '36px 32px 32px 32px',
            minWidth: 340,
            maxWidth: '90vw',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
            <button
              onClick={() => setPasswordEdit(false)}
              style={{ position: 'absolute', top: 18, right: 24, background: 'transparent', border: 'none', fontSize: 20, color: '#fff', cursor: 'pointer', borderRadius: '50%', width: 32, height: 32 }}
            >
              ×
            </button>
            <div style={{ fontSize: 26, fontWeight: 600, color: '#fff', marginBottom: 28, textAlign: 'center', letterSpacing: 1 }}>Изменение пароля</div>
            <input
              type="password"
              placeholder="текущий пароль"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              style={{ marginBottom: 18, padding: '14px 18px', borderRadius: 22, border: 'none', fontSize: 18, background: '#d9d9d9', color: '#444', outline: 'none' }}
            />
            <div style={{ position: 'relative', marginBottom: 28 }}>
              <input
                type="password"
                placeholder="новый пароль"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '14px 18px', borderRadius: 22, border: 'none', fontSize: 18, background: '#d9d9d9', color: '#444', outline: 'none' }}
              />
              <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: 18, cursor: 'pointer' }}>ⓘ</span>
            </div>
            <button
              style={{ background: '#f9f6ed', color: '#444', border: 'none', borderRadius: 22, padding: '12px 0', fontWeight: 600, fontSize: 18, cursor: 'pointer', marginTop: 8 }}
              onClick={handlePasswordSave}
            >
              изменить
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: isMobile ? '98vw' : '700px',
          margin: isMobile ? '0' : '40px auto 0 auto',
          padding: isMobile ? '0 2vw' : '0',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '1.2rem' : '1.8rem',
          alignItems: 'center',
        }}
      >
        {/* Основная информация */}
        <div
          style={{
            background: 'rgba(255,255,255,0.55)',
            borderRadius: isMobile ? '18px' : '32px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            border: '1.5px solid rgba(255,255,255,0.18)',
            padding: isMobile ? '18px 10px 14px 10px' : '32px 36px 28px 36px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '1.2rem' : '2rem',
            width: '100%',
            minWidth: 0,
          }}
        >
          {/* Фото */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: isMobile ? 80 : 140 }}>
            <div
              style={{
                width: isMobile ? 70 : 110,
                height: isMobile ? 70 : 110,
                borderRadius: '50%',
                border: '2.5px solid #b3d0e6',
                background: '#f8fcff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {photo ? (
                <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <svg width={isMobile ? 36 : 60} height={isMobile ? 36 : 60} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#b3d0e6" strokeWidth="2" />
                  <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#b3d0e6" strokeWidth="2" />
                </svg>
              )}
              {/* Статус */}
              <span
                style={{
                  position: 'absolute',
                  right: isMobile ? 4 : 10,
                  bottom: isMobile ? 4 : 10,
                  width: isMobile ? 10 : 16,
                  height: isMobile ? 10 : 16,
                  borderRadius: '50%',
                  background: '#8efc8e',
                  border: '2.5px solid #fff',
                }}
              />
            </div>
            <button
              style={{
                marginTop: 6,
                background: 'linear-gradient(90deg, #b3d0e6 0%, #e0f0ff 100%)',
                border: 'none',
                borderRadius: 12,
                padding: isMobile ? '4px 10px' : '6px 18px',
                fontSize: isMobile ? 13 : 15,
                color: '#234',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 1px 4px #0001',
                transition: 'background 0.2s',
              }}
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              изменить фото
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = ev => setPhoto(ev.target?.result as string);
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </div>
          {/* Инфо */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 600, marginBottom: 8 }}>Основная информация</div>
            <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 500, marginBottom: 6 }}>{user.name}</div>
            <div style={{ fontSize: isMobile ? 13 : 16, marginBottom: 2 }}>
              Роль: <span style={{ fontWeight: 600 }}>администратор <span style={{ color: '#f7b500' }}>☆</span></span>
            </div>
            <div style={{ fontSize: isMobile ? 12 : 15, marginBottom: 2 }}>Дата регистрации:</div>
            <div style={{ fontSize: isMobile ? 12 : 15, marginBottom: 2 }}>ID сотрудника:</div>
            <div style={{ fontSize: isMobile ? 12 : 15, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
              Статус пользователя: <span style={{ color: '#2bbd2b', fontWeight: 500, marginLeft: 6 }}>активен <span style={{ display: 'inline-block', width: isMobile ? 8 : 10, height: isMobile ? 8 : 10, background: '#8efc8e', borderRadius: '50%', marginLeft: 4, verticalAlign: 'middle' }} /></span>
            </div>
          </div>
        </div>
        {/* Безопасность */}
        <div
          style={{
            background: 'rgba(255,255,255,0.45)',
            borderRadius: isMobile ? 14 : 28,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            border: '1.5px solid rgba(255,255,255,0.13)',
            padding: isMobile ? '12px 10px 10px 10px' : '24px 36px 18px 36px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            width: '100%',
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: isMobile ? 14 : 17, fontWeight: 600, marginBottom: 8 }}>Безопасность</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18, marginBottom: 8 }}>
              <span style={{ fontSize: isMobile ? 12 : 15 }}>Email</span>
              {email ? (
                <span style={{fontWeight: 500}}>{email}</span>
              ) : emailEdit ? (
                <>
                  <input value={emailInput} onChange={e => setEmailInput(e.target.value)} style={{padding: 6, borderRadius: 8, border: '1px solid #ccc'}} />
                  <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14 }} onClick={handleEmailSave}>сохранить</button>
                </>
              ) : (
                <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14 }} onClick={() => setEmailEdit(true)}>указать</button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18 }}>
              <span style={{ fontSize: isMobile ? 12 : 15 }}>Пароль</span>
              <button style={{ background: 'linear-gradient(90deg, #b3d0e6 0%, #e0f0ff 100%)', border: 'none', borderRadius: 10, padding: isMobile ? '3px 8px' : '4px 14px', fontSize: isMobile ? 12 : 14, color: '#234', fontWeight: 500, cursor: 'pointer', marginLeft: 8 }} onClick={() => setPasswordEdit(true)}>изменить</button>
            </div>
          </div>
        </div>
        {/* Привязки */}
        <div
          style={{
            background: 'rgba(255,255,255,0.40)',
            borderRadius: isMobile ? 10 : 24,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
            border: '1.5px solid rgba(255,255,255,0.10)',
            padding: isMobile ? '8px 10px 8px 10px' : '20px 36px 14px 36px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: isMobile ? 14 : 17, fontWeight: 600, marginBottom: 8 }}>Привязки</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18 }}>
              <span style={{ fontSize: isMobile ? 12 : 15 }}>Организация:</span>
              {org ? <span style={{ color: '#1bbf1b', fontWeight: 500 }}>{org}</span> : <span style={{ color: 'red', fontWeight: 500 }}>не привязана</span>}
            </div>
            {orgEdit ? (
              <>
                <select value={org} onChange={e => setOrg(e.target.value)} style={{marginLeft: 8, padding: 6, borderRadius: 8, border: '1px solid #ccc'}}>
                  <option value="">--Выберите--</option>
                  {mockOrganizations.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14, marginLeft: 8 }} onClick={handleOrgSave}>сохранить</button>
              </>
            ) : (
              <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14, marginLeft: 8 }} onClick={() => setOrgEdit(true)}>{org ? 'изменить' : 'привязать'}</button>
            )}
          </div>
        </div>
        {/* Журнал активности */}
        <div
          style={{
            background: 'rgba(255,255,255,0.35)',
            borderRadius: isMobile ? 8 : 22,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
            border: '1.5px solid rgba(255,255,255,0.08)',
            padding: isMobile ? '8px 10px 8px 10px' : '18px 36px 18px 36px',
            fontSize: isMobile ? 12 : 15,
            color: '#444',
            width: '100%',
            minWidth: 0,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Журнал активности</div>
          <div style={{ opacity: 0.8 }}>
            {user.activity.map((a, i) => (
              <div key={i}>{a}</div>
            ))}
          </div>
        </div>
        {/* Кнопки */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 10 : 18,
            marginTop: 8,
            justifyContent: 'center',
            width: '100%',
            minWidth: 0,
          }}
        >
          <button
            style={{
              background: 'linear-gradient(90deg, #b3d0e6 0%, #e0f0ff 100%)',
              border: 'none',
              borderRadius: 12,
              padding: isMobile ? '8px 0' : '10px 22px',
              fontSize: isMobile ? 13 : 15,
              color: '#234',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 1px 4px #0001',
              transition: 'background 0.2s',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 0 : 120,
            }}
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            завершить другие сеансы <span style={{ fontSize: isMobile ? 15 : 18 }}>%</span>
          </button>
          <button
            style={{
              background: 'linear-gradient(90deg, #b3d0e6 0%, #e0f0ff 100%)',
              border: 'none',
              borderRadius: 12,
              padding: isMobile ? '8px 0' : '10px 22px',
              fontSize: isMobile ? 13 : 15,
              color: '#234',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 1px 4px #0001',
              transition: 'background 0.2s',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 0 : 120,
            }}
          >
            скачать резервную копию <span style={{ fontSize: isMobile ? 15 : 18 }}>↓</span>
          </button>
          <button
            style={{
              background: 'linear-gradient(90deg, #e0f0ff 0%, #b3d0e6 100%)',
              border: 'none',
              borderRadius: 12,
              padding: isMobile ? '8px 0' : '10px 22px',
              fontSize: isMobile ? 13 : 15,
              color: '#234',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 1px 4px #0001',
              transition: 'background 0.2s',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 0 : 120,
            }}
            onClick={() => setDeactivate(true)}
          >
            деактивировать аккаунт
          </button>
        </div>
        {deactivate && (
          <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'#0007', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
            <div style={{background:'#fff', borderRadius:16, padding:32, minWidth:300, textAlign:'center'}}>
              <div style={{marginBottom:16}}>Вы уверены, что хотите деактивировать аккаунт?</div>
              <button style={{marginRight:8, background:'#eee', color:'#234', border:'none', borderRadius:12, padding:'8px 18px', fontWeight:500, cursor:'pointer'}} onClick={()=>setDeactivate(false)}>Отмена</button>
              <button style={{background:'#ffb3b3', color:'#a00', border:'none', borderRadius:12, padding:'8px 18px', fontWeight:500, cursor:'pointer'}} onClick={handleDeactivate}>Деактивировать</button>
            </div>
          </div>
        )}
        {message && (
          <div style={{position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#fff', color:'#234', borderRadius:12, padding:'12px 32px', boxShadow:'0 2px 16px #0002', fontWeight:500, zIndex:1001}}>{message}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 