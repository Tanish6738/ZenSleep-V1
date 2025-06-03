import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = ({ 
  color1 = '#8B9E90', 
  color2 = '#D4BE98',
  height = 3,
  showOnMobile = true,
  showPercentage = false
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef(null);
  const previousScrollTop = useRef(0);

  useEffect(() => {
    // Throttled scroll handler using requestAnimationFrame for performance
    const handleScroll = () => {
      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        // Calculate how much has been scrolled
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Avoid division by zero
        if (totalHeight <= 0) {
          return;
        }
        
        const currentProgress = Math.min(window.scrollY / totalHeight, 1);
        setScrollProgress(currentProgress);
        
        // Show indicator only after scrolling down a bit or when scrolling up from below
        const currentScrollTop = window.scrollY;
        const scrollingDown = currentScrollTop > previousScrollTop.current;
        
        setIsVisible(
          currentScrollTop > 100 || 
          (!scrollingDown && currentScrollTop > 300)
        );
        
        previousScrollTop.current = currentScrollTop;
      });
    };

    // Add scroll event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Hide on mobile if configured
  if (!showOnMobile && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ height: `${height}px` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="h-full"
          style={{ 
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(to right, ${color1}, ${color2})`,
            boxShadow: '0 0 10px rgba(139, 158, 144, 0.4)'
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {showPercentage && (
        <motion.div
          className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            color: color1,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>
      )}
    </>
  );
};

export default ScrollIndicator;
