import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        minWidth: 260,
        maxWidth: 380,
        borderRadius: 32,
        background: '#444',
        padding: '24px 24px 20px 24px',
        boxShadow: '0 4px 32px #0005',
        color: '#fff',
        textAlign: 'center',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 16,
            width: 28, height: 28, borderRadius: '50%',
            background: '#e0e0e0', border: 'none', color: '#444', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Закрыть"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 