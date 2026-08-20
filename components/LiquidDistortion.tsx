import React, { useRef } from 'react';

export function LiquidDistortion({ children, className = "", scale = 15, speed = 10 }: { children: React.ReactNode, className?: string, scale?: number, speed?: number }) {
  // Gera um ID único para evitar conflitos se houver múltiplos componentes na tela
  const filterId = useRef(`liquid-${Math.random().toString(36).substring(2, 9)}`);
  
  return (
    <div className={`relative inline-block ${className}`} style={{ filter: `url(#${filterId.current})` }}>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015 0.02" 
            numOctaves="1" 
            result="warp" 
          >
            <animate 
              attributeName="baseFrequency" 
              values="0.015 0.02; 0.01 0.01; 0.015 0.02" 
              dur={`${speed}s`} 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="warp" 
            scale={scale} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
      {children}
    </div>
  );
}
