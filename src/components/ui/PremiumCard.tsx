'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { staggerItem } from './StaggerChildren';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function PremiumCard({
  children,
  className,
  hover = true,
  as = 'div',
  href,
  target,
  rel,
  onClick,
}: PremiumCardProps) {
  const baseClasses = cn(
    'p-6 bg-bg-card rounded-2xl border border-border-subtle',
    'transition-all duration-250',
    hover && 'hover:border-border hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5',
    className
  );

  const props = {
    className: baseClasses,
    ...(as === 'a' ? { href, target, rel } : {}),
    ...(onClick ? { onClick } : {}),
  };

  if (as === 'a') {
    return (
      <motion.a
        variants={staggerItem}
        {...(props as React.ComponentProps<typeof motion.a>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
