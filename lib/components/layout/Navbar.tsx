'use client';

import { useState, useContext, useEffect, useCallback } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartContext } from '@/lib/context/CartContext';
import Link from 'next/link';
import { companyName } from '@/lib/constants/website';

type Props = {
  onCartOpen: () => void,
}

const navLinks = [
  { label: 'Тип: AGM', to: '/products/AGM' },
  { label: 'Тип: GEL', to: '/products/GEL' },
];

export const Navbar = ({ onCartOpen }: Props) => {
  const { cartItems } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);

  const setUpScrollEv = useCallback(() => {
    const handler = () => setScrolled(window.scrollY > 40);
  
    window.addEventListener('scroll', handler, { passive: true });

    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const listener = setUpScrollEv();

    return listener();
  }, [setUpScrollEv]);

  return (
    <nav className={`relative md:w-[15%]! w-[40%] h-[200px] sm:h-auto duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto p-5 h-0 sm:h-auto bg-primary-foreground">
        <div className="flex flex-col gap-3 h-[100vh]">
          <Link href="/" className="flex items-center gap-4">
            <Zap className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
            <span className="font-heading font-bold text-5xl sm:text-xl tracking-tight text-foreground">
              <span className="text-primary">{companyName}</span>
            </span>
          </Link>

          <div className="flex flex-col items-start">
            {navLinks.map(link => (
              <Link
                key={link.to}
                href={link.to}
                className="p-2 mt-5"
              >
                <span className="text-sm font-mono text-muted-foreground hover:text-foreground">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/products"
              className="p-2 mt-5"
            >
              <span className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                УСІ
              </span>
            </Link>
            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={onCartOpen}
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors haptic-btn cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}