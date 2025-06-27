import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const mockOrganizations = ['Org1', 'Org2', 'Org3'];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
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
    setMessage('Пароль изменён!');
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #e0f0ff 0%, #b3d0e6 100%)',
      padding: 0,
      margin: 0,
      position: 'relative',
    }}>
      {/* Меню */}
      <div style={{ background: '#8ec3e6', height: 48, display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between', borderTop: '1px solid #2222', borderBottom: '1px solid #2222' }}>
        <div style={{ display: 'flex', gap: 32, fontSize: 18, color: '#234', fontWeight: 500 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>главная</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>пользователи</span>
          <span style={{ cursor: 'pointer' }}>маршруты</span>
          <span style={{ cursor: 'pointer' }}>организации</span>
          <span style={{ cursor: 'pointer' }}>транспорт</span>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #234', boxSizing: 'border-box', background: '#fff', cursor: 'pointer', position: 'relative' }}>
          <div style={{position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#8efc8e', border: '2px solid #fff'}}></div>
        </div>
      </div>
      {/* Контент */}
      <div style={{ maxWidth: 700, margin: '40px auto 0 auto', paddingBottom: 40 }}>
        {/* Основная информация */}
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 32, padding: 32, marginBottom: 24, display: 'flex', gap: 32, alignItems: 'flex-start', boxShadow: '0 2px 16px #0001', color: '#111' }}>
          <div style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid #888', background: '#f8f8f8', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {photo ? <img src={photo} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : null}
            </div>
            <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '8px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14 }} onClick={() => fileInput.current?.click()}>изменить фото</button>
            <input type="file" accept="image/*" ref={fileInput} style={{display: 'none'}} onChange={handlePhotoChange} />
          </div>
          <div style={{ flex: 1, fontSize: 17, color: '#111' }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, color: '#111' }}>Основная информация</div>
            <div style={{ color: '#111' }}>{user.name}</div>
            <div style={{ color: '#222' }}>Роль: <span style={{ fontWeight: 500 }}>администратор <span style={{ color: '#f7c948' }}>☆</span></span></div>
            <div style={{ color: '#222' }}>Дата регистрации: <span style={{ fontWeight: 500 }}>{user.registered}</span></div>
            <div style={{ color: '#222' }}>ID сотрудника: <span style={{ fontWeight: 500 }}>{user.employeeId}</span></div>
            <div style={{ color: '#222' }}>Статус пользователя: <span style={{ color: '#1bbf1b', fontWeight: 500 }}>активен <span style={{ display: 'inline-block', width: 10, height: 10, background: '#8efc8e', borderRadius: '50%', marginLeft: 4, verticalAlign: 'middle' }}></span></span></div>
          </div>
        </div>
        {/* Безопасность */}
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 24, padding: 24, marginBottom: 24, boxShadow: '0 2px 16px #0001', color: '#111' }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Безопасность</div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div>Email</div>
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
            <div style={{ marginLeft: 32 }}>Пароль</div>
            {passwordEdit ? (
              <>
                <input type="password" placeholder="Старый пароль" value={oldPassword} onChange={e => setOldPassword(e.target.value)} style={{padding: 6, borderRadius: 8, border: '1px solid #ccc'}} />
                <input type="password" placeholder="Новый пароль" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{padding: 6, borderRadius: 8, border: '1px solid #ccc'}} />
                <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14 }} onClick={handlePasswordSave}>сохранить</button>
              </>
            ) : (
              <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '6px 16px', fontWeight: 500, cursor: 'pointer', fontSize: 14 }} onClick={() => setPasswordEdit(true)}>изменить</button>
            )}
          </div>
        </div>
        {/* Привязки */}
        <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 24, padding: 24, marginBottom: 24, boxShadow: '0 2px 16px #0001', color: '#111' }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Привязки</div>
          <div>
            Организация: {org ? <span style={{ color: '#1bbf1b', fontWeight: 500 }}>{org}</span> : <span style={{ color: 'red', fontWeight: 500 }}>не привязана</span>}
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
        <div style={{ background: 'rgba(220,240,255,0.5)', borderRadius: 24, padding: 24, marginBottom: 24, boxShadow: '0 2px 16px #0001', color: '#111' }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Журнал активности <span style={{ color: '#888', fontSize: 15 }}>ⓘ</span></div>
          <div style={{ color: '#444', fontSize: 15 }}>
            {user.activity.map((a, i) => <div key={i}>{a}</div>)}
          </div>
        </div>
        {/* Кнопки */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '10px 18px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}>завершить другие сеансы</button>
          <button style={{ background: '#8ec3e6', color: '#234', border: 'none', borderRadius: 12, padding: '10px 18px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }}>скачать резервную копию <span style={{fontSize:18}}>↓</span></button>
          <button style={{ background: '#eee', color: '#234', border: 'none', borderRadius: 12, padding: '10px 18px', fontWeight: 500, cursor: 'pointer', fontSize: 15 }} onClick={() => setDeactivate(true)}>деактивировать аккаунт</button>
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