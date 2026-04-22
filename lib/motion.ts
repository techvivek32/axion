// Shared Framer Motion variants

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const cardHover = {
  rest: { scale: 1, borderColor: 'rgba(255,255,255,0.07)', y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    borderColor: 'rgba(200,168,108,0.4)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const lineGrow = {
  hidden: { scaleY: 0, originY: 0 },
  show: { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const viewportOnce = { once: true, margin: '-80px' };
