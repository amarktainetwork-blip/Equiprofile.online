import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
