import React, { useEffect } from 'react';
// import Header from '../components/Header';

const quickActions = [
  {
    label: 'добавить пользователя',
    img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'добавить маршрут',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'регистрация ТС',
    img: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80',
  },
];

const MainPage: React.FC = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#e3e3e3';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.background = '#e3e3e3';
    document.documentElement.style.overflowX = 'hidden';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#e3e3e3',
      padding: 0,
      margin: 0,
      fontFamily: 'Montserrat, Arial, sans-serif',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      paddingTop: 48,
    }}>
      {/* Header теперь фиксированный, отступ сверху учтён */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Карта */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          marginTop: '3vw',
          marginBottom: '3vw',
        }}>
          <div style={{
            background: '#fffbe9',
            borderRadius: '3vw',
            minHeight: '18vw',
            width: '100%',
            boxShadow: '0 0.2vw 1vw #0001',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 400, fontSize: '2vw', color: '#222', textAlign: 'center', width: '100%' }}>
              интерактивная карта?
            </span>
            <span style={{ position: 'absolute', top: '1.2vw', right: '2vw', cursor: 'pointer', opacity: 0.7 }}>
              <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="2" rx="1" fill="#b3b3b3"/><rect x="7" y="7" width="10" height="2" rx="1" fill="#b3b3b3"/><rect x="5" y="11" width="14" height="2" rx="1" fill="#b3b3b3"/><rect x="7" y="15" width="10" height="2" rx="1" fill="#b3b3b3"/><rect x="9" y="19" width="6" height="2" rx="1" fill="#b3b3b3"/></svg>
            </span>
          </div>
        </div>
        {/* Быстрые действия */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, marginBottom: '2vw' }}>
          <div style={{ fontWeight: 600, fontSize: '1.2vw', color: '#222', marginBottom: '1vw', textAlign: 'center' }}>Быстрые действия &gt;</div>
          <div style={{ display: 'flex', gap: '2vw', margin: 0, alignItems: 'center', justifyContent: 'center' }}>
            {quickActions.map((a, i) => (
              <div key={a.label} style={{
                width: '10vw',
                height: '10vw',
                borderRadius: '1.5vw',
                background: `url('${a.img}') center center/cover no-repeat`,
                boxShadow: '0 0.2vw 1vw #0002',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
                minWidth: 100,
                minHeight: 100,
                maxWidth: 180,
                maxHeight: 180,
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #fff8 0%, #0002 100%)',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '3vw',
                  height: '3vw',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2vw',
                  fontWeight: 700,
                  color: '#b3b3b3',
                  zIndex: 2,
                  border: '0.2vw solid #e3e3e3',
                  minWidth: 36,
                  minHeight: 36,
                  maxWidth: 60,
                  maxHeight: 60,
                }}>+</div>
                <div style={{
                  position: 'absolute',
                  bottom: '0.7vw',
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1vw',
                  textShadow: '0 0.2vw 0.8vw #0008',
                  zIndex: 2,
                  letterSpacing: 0.5,
                  background: 'rgba(0,0,0,0.18)',
                  borderRadius: '0.7vw',
                  padding: '0.2vw 0',
                  minHeight: 18,
                }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Последние действия */}
        <div style={{ width: '100%', margin: 0, marginTop: '3vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 400, fontSize: '1vw', color: '#222', marginBottom: '0.7vw', textAlign: 'center' }}>Последние действия на сайте:</div>
          <div style={{ width: '12vw', height: '2.5vw', background: '#e6f6ff', borderRadius: '1vw', opacity: 0.7, minWidth: 100, minHeight: 32, maxWidth: 220, maxHeight: 60 }} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
