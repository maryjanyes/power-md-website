'use client';

import { useState, useEffect } from 'react';

export default function ChargeStateIndicator() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{
          width: `${scrollPercent}%`,
          boxShadow: '0 0 12px hsl(75 100% 50% / 0.6), 0 0 30px hsl(75 100% 50% / 0.3)'
        }}
      />
    </div>
  );
}