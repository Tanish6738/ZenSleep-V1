import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Custom component for revealing elements on scroll
const ScrollReveal = ({ 
  children, 
  threshold = 0.1,
  duration = 0.5,
  delay = 0, 
  direction = null, // 'up', 'down', 'left', 'right', 'scale'
  distance = 50,
  scale = 0.95, // Initial scale when using 'scale' direction
  once = true,
  cascade = false, // Enable cascade effect for child elements
  cascadeDelay = 0.1, // Delay between each child animation
  staggerChildren = 0.05, // Stagger delay for child animations
  ease = [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth feel
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    // Add margin to trigger animations slightly before elements come into view
    margin: "0px 0px -50px 0px"
  });
  const controls = useAnimation();

  // Get initial animation values based on direction
  const getInitialAnimation = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'scale':
        return { scale, opacity: 0 };
      case 'flip':
        return { rotateX: 90, opacity: 0 };
      case 'rotate':
        return { rotate: -15, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  // Get target animation values based on direction
  const getTargetAnimation = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'scale':
        return { scale: 1, opacity: 1 };
      case 'flip':
        return { rotateX: 0, opacity: 1 };
      case 'rotate':
        return { rotate: 0, opacity: 1 };
      default:
        return { opacity: 1 };
    }
  };

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isInView) {
      if (prefersReducedMotion) {
        // Immediately show content without animation
        controls.set({ opacity: 1 });
      } else {
        controls.start(getTargetAnimation());
      }
    }
  }, [isInView, controls]);

  // If cascade effect is enabled, apply staggered animation to children
  if (cascade && React.Children.count(children) > 0) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren: delay
            }
          }
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            variants={{
              hidden: getInitialAnimation(),
              visible: {
                ...getTargetAnimation(),
                transition: {
                  duration,
                  ease,
                  delay: index * cascadeDelay
                }
              }
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Regular reveal animation
  return (
    <motion.div
      ref={ref}
      initial={getInitialAnimation()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Export additional presets for common animations
export const FadeIn = (props) => <ScrollReveal {...props} />;
export const FadeUp = (props) => <ScrollReveal direction="up" {...props} />;
export const FadeDown = (props) => <ScrollReveal direction="down" {...props} />;
export const FadeLeft = (props) => <ScrollReveal direction="left" {...props} />;
export const FadeRight = (props) => <ScrollReveal direction="right" {...props} />;
export const ScaleIn = (props) => <ScrollReveal direction="scale" {...props} />;
export const FlipIn = (props) => <ScrollReveal direction="flip" {...props} />;
export const RotateIn = (props) => <ScrollReveal direction="rotate" {...props} />;
export const CascadeReveal = (props) => <ScrollReveal cascade={true} {...props} />;

export default ScrollReveal;
