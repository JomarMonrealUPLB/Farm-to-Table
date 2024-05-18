import React from 'react';
import './Popup.css';

const Popup = ({onOutsideClick, borderRadius, width, height, child}) => {
  return (
    <div className='whole_screen'
      style={{zIndex: 10}}
    >
      <div className='popup' style={{
        borderRadius: borderRadius,
        width: width,
        height: height,
        backgroundColor: 'var(--primary-background)',
        zIndex: 20,
        margin: '0 auto',
      }}>
        {child}
      </div>

      <div className='blackout_screen' style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#252525',
        opacity: 0.6,
        zIndex: 15,
      }}
      onClick={onOutsideClick}
      >
      </div>
    </div>
  );
};

Popup.defaultProps = {
  child: null,
  height: "80vh",
  width: "40vw",
  borderRadius: 0,
};

export default Popup;