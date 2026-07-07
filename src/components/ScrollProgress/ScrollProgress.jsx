import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import './ScrollProgress.scss';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#f6f1ec', '#4a3428', '#3d2a1f'],
  );

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, background }}
    />
  );
};

export default ScrollProgress;
