import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  // Адаптивные размеры
  const headerHeight = isMobile ? 60 : isTablet ? 70 : 80;
  const containerMaxWidth = isMobile ? '98vw' : isTablet ? '95vw' : 1200;
  const containerPadding = isMobile ? '0 16px' : isTablet ? '0 24px' : '0 24px';
  const cardBorderRadius = isMobile ? '16px' : isTablet ? '20px' : '3vw';
  const cardMinHeight = isMobile ? '120px' : isTablet ? '140px' : '18vw';
  const actionSize = isMobile ? '80px' : isTablet ? '100px' : '10vw';
  const actionMinSize = isMobile ? 80 : isTablet ? 100 : 100;
  const actionMaxSize = isMobile ? 120 : isTablet ? 140 : 180;
  const titleFontSize = isMobile ? '16px' : isTablet ? '18px' : '1.2vw';
  const subtitleFontSize = isMobile ? '14px' : isTablet ? '16px' : '1vw';
  const cardTitleFontSize = isMobile ? '18px' : isTablet ? '20px' : '2vw';

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
      paddingTop: headerHeight + 16,
    }}>
      {/* Header теперь фиксированный, отступ сверху учтён */}
      <div style={{
        maxWidth: containerMaxWidth,
        margin: '0 auto',
        padding: containerPadding,
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
          marginTop: isMobile ? '20px' : isTablet ? '2vw' : '3vw',
          marginBottom: isMobile ? '20px' : isTablet ? '2vw' : '3vw',
        }}>
          <div style={{
            background: '#fffbe9',
            borderRadius: cardBorderRadius,
            minHeight: cardMinHeight,
            width: '100%',
            boxShadow: '0 0.2vw 1vw #0001',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ 
              fontFamily: 'Montserrat, Arial, sans-serif', 
              fontWeight: 400, 
              fontSize: cardTitleFontSize, 
              color: '#222', 
              textAlign: 'center', 
              width: '100%',
              padding: isMobile ? '20px' : isTablet ? '24px' : '2vw',
            }}>
              интерактивная карта?
            </span>
            <span style={{ 
              position: 'absolute', 
              top: isMobile ? '12px' : isTablet ? '16px' : '1.2vw', 
              right: isMobile ? '16px' : isTablet ? '20px' : '2vw', 
              cursor: 'pointer', 
              opacity: 0.7 
            }}>
              <svg width={isMobile ? '20px' : isTablet ? '24px' : '2vw'} height={isMobile ? '20px' : isTablet ? '24px' : '2vw'} viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="2" rx="1" fill="#b3b3b3"/>
                <rect x="7" y="7" width="10" height="2" rx="1" fill="#b3b3b3"/>
                <rect x="5" y="11" width="14" height="2" rx="1" fill="#b3b3b3"/>
                <rect x="7" y="15" width="10" height="2" rx="1" fill="#b3b3b3"/>
                <rect x="9" y="19" width="6" height="2" rx="1" fill="#b3b3b3"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Быстрые действия */}
        <div style={{ width: '100%', marginBottom: isMobile ? '20px' : isTablet ? '2vw' : '3vw' }}>
          <div style={{ 
            fontWeight: 600, 
            fontSize: titleFontSize, 
            color: '#222', 
            marginBottom: isMobile ? '12px' : isTablet ? '1vw' : '1vw', 
            textAlign: 'center' 
          }}>
            Быстрые действия &gt;
          </div>
          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '16px' : isTablet ? '20px' : '2vw', 
            margin: 0, 
            alignItems: 'center', 
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {quickActions.map((a, i) => (
              <div key={a.label} style={{
                width: actionSize,
                height: actionSize,
                borderRadius: isMobile ? '12px' : isTablet ? '16px' : '1.5vw',
                background: `url('${a.img}') center center/cover no-repeat`,
                boxShadow: '0 0.2vw 1vw #0002',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
                minWidth: actionMinSize,
                minHeight: actionMinSize,
                maxWidth: actionMaxSize,
                maxHeight: actionMaxSize,
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
                  width: isMobile ? '32px' : isTablet ? '36px' : '3vw',
                  height: isMobile ? '32px' : isTablet ? '36px' : '3vw',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '20px' : isTablet ? '22px' : '2vw',
                  fontWeight: 700,
                  color: '#b3b3b3',
                  zIndex: 2,
                  border: isMobile ? '2px solid #e3e3e3' : isTablet ? '2px solid #e3e3e3' : '0.2vw solid #e3e3e3',
                  minWidth: isMobile ? 32 : isTablet ? 36 : 36,
                  minHeight: isMobile ? 32 : isTablet ? 36 : 36,
                  maxWidth: isMobile ? 48 : isTablet ? 52 : 60,
                  maxHeight: isMobile ? 48 : isTablet ? 52 : 60,
                }}>+</div>
                <div style={{
                  position: 'absolute',
                  bottom: isMobile ? '8px' : isTablet ? '10px' : '0.7vw',
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: isMobile ? '12px' : isTablet ? '14px' : '1vw',
                  textShadow: '0 0.2vw 0.8vw #0008',
                  zIndex: 2,
                  letterSpacing: 0.5,
                  background: 'rgba(0,0,0,0.18)',
                  borderRadius: isMobile ? '6px' : isTablet ? '8px' : '0.7vw',
                  padding: isMobile ? '4px 8px' : isTablet ? '6px 10px' : '0.2vw 0',
                  minHeight: isMobile ? 20 : isTablet ? 24 : 18,
                }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Последние действия */}
        <div style={{ width: '100%', marginBottom: isMobile ? '20px' : isTablet ? '2vw' : '3vw' }}>
          <div style={{ 
            fontWeight: 400, 
            fontSize: subtitleFontSize, 
            color: '#222', 
            marginBottom: isMobile ? '8px' : isTablet ? '10px' : '0.7vw', 
            textAlign: 'center' 
          }}>
            Последние действия на сайте:
          </div>
          <div style={{ 
            width: isMobile ? '200px' : isTablet ? '240px' : '12vw', 
            height: isMobile ? '40px' : isTablet ? '48px' : '2.5vw', 
            background: '#e6f6ff', 
            borderRadius: isMobile ? '8px' : isTablet ? '10px' : '1vw', 
            opacity: 0.7, 
            minWidth: 100, 
            minHeight: 32, 
            maxWidth: isMobile ? 200 : isTablet ? 240 : 220, 
            maxHeight: isMobile ? 40 : isTablet ? 48 : 60,
            margin: '0 auto',
          }} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
