'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

const ModernHero = () => {
  const containerRef = useRef(null);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left - width / 2);
        mouseY.set(e.clientY - top - height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const imageX = useTransform(mouseX, [-400, 400], [15, -15]);
  const imageY = useTransform(mouseY, [-300, 300], [10, -10]);

  // Animation Variants
  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const wordAnim = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const headline = "Elegance in Weave";

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-editorial-cream text-charcoal-grey flex flex-col justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center h-full">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight mb-6">
              <>
                {headline.split(' ').map((word, index) => (
                  <span key={index} className="inline-block overflow-hidden pb-2 mr-3">
                    <motion.span className="inline-block" variants={wordAnim}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </>
            </h1>
            <motion.p
              className="text-lg md:text-xl text-charcoal-grey/80 max-w-md mx-auto lg:mx-0 mb-8"
              variants={fadeInUp}
            >
              Discover the timeless beauty of authentic, handcrafted sarees from across India.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <MagneticButton
                href="/shop"
                className="bg-charcoal-grey text-editorial-cream font-bold py-4 px-10 rounded-full text-lg transition-colors duration-300 hover:bg-rose-gold"
              >
                View Collection
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          
          <div className="absolute inset-0 lg:relative w-full h-full z-0 pointer-events-none lg:pointer-events-auto">
            <motion.div
className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-1/2 lg:w-[70vw] lg:h-[70vh] max-w-[640px] opacity-30 lg:opacity-100"
               initial={{ scale: 1.2, x: '20%', opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <motion.div
                className="w-full h-full relative rounded-lg overflow-hidden"
                style={{ x: imageX, y: imageY }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1711688588765-269de854959a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Model in a contemporary saree"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-charcoal-grey text-editorial-cream flex items-center overflow-hidden z-30">
      
        <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-100%'] }} transition={{ ease: 'linear', duration: 30, repeat: Infinity }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="px-8 text-sm tracking-wider">
              Heritage Meets Modernity • Autumn Collection '2026
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHero;