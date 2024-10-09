import React from 'react';

interface MissileProps {
  style: React.CSSProperties;
}

const Missile: React.FC<MissileProps> = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 300"
      className="missile"
      style={{
        ...style,
        width: '200px',
        height: '600px',
      }}
    >
      {/* Missile body */}
      <path
        d="M50 10 L40 280 L60 280 L50 10"
        fill="url(#missileGradient)"
        stroke="#444"
        strokeWidth="2"
      />
      {/* Missile tip */}
      <path
        d="M50 10 L40 50 L60 50 Z"
        fill="#d32f2f"
        stroke="#444"
        strokeWidth="2"
      />
      {/* Fins */}
      <path
        d="M40 280 L20 300 L40 290 Z"
        fill="#9e9e9e"
        stroke="#444"
        strokeWidth="2"
      />
      <path
        d="M60 280 L80 300 L60 290 Z"
        fill="#9e9e9e"
        stroke="#444"
        strokeWidth="2"
      />
      {/* Gradient for missile body */}
      <defs>
        <linearGradient id="missileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78909c" />
          <stop offset="50%" stopColor="#b0bec5" />
          <stop offset="100%" stopColor="#78909c" />
        </linearGradient>
      </defs>
      {/* Flame */}
      <path
        d="M45 280 Q50 320 55 280"
        fill="url(#flameGradient)"
        opacity="0.8"
      >
        <animate
          attributeName="d"
          values="M45 280 Q50 320 55 280; M45 280 Q50 300 55 280; M45 280 Q50 320 55 280"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
      {/* Gradient for flame */}
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9800" />
          <stop offset="50%" stopColor="#ff5722" />
          <stop offset="100%" stopColor="#f44336" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Missile;