'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MagneticButton({
  children,
  className,
  href = '/',
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      className="relative"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: x * 0.1, y: y * 0.1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
    >
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}