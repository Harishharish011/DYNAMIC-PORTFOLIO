import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

type MotionWrapperProps = PropsWithChildren<{
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
}>;

export function MotionWrapper({
  children,
  className = '',
  initial = { opacity: 0, y: 14 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
