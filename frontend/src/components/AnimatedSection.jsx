import { motion } from 'framer-motion';

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  animation = 'slideUp',
  viewport = { once: true, margin: "-50px" } 
}) => {
  return (
    <motion.div
      variants={variants[animation] || variants.slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
