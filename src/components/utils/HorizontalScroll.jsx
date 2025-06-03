import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * HorizontalScroll component for creating smooth, touch-friendly horizontal scrolling sections.
 * Great for image galleries, product carousels, and horizontal content sections.
 */
const HorizontalScroll = ({
  children,
  className = '',
  showArrows = true,
  showDots = false,
  snapToItems = true,
  dragToScroll = true,
  centerItems = false,
  itemWidth = '300px', // Fixed width or 'auto' for variable widths
  gap = '20px',
  arrowColor = 'var(--accent-1)',
  arrowSize = '40px',
  arrowBgColor = 'white',
  dotColor = 'var(--accent-1)',
  scrollPadding = '1rem',
  scrollSnap = 'start', // 'start', 'center', 'end'
}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  // Setup scroll container and observe scroll position
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Count actual children for dot navigation
    setChildrenCount(React.Children.count(children));
    
    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      
      // Show/hide navigation arrows based on scroll position
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
      
      // Update active dot index based on scroll position
      if (showDots && childrenCount > 0) {
        const itemWidth = scrollWidth / childrenCount;
        const index = Math.min(
          Math.floor((scrollLeft + itemWidth / 2) / itemWidth),
          childrenCount - 1
        );
        setActiveIndex(index);
      }
    };
    
    // Initial check
    checkScroll();
    
    // Add scroll event listener
    scrollContainer.addEventListener('scroll', checkScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', checkScroll);
    };
  }, [children, childrenCount, showDots]);

  // Scroll to next or previous item
  const scrollTo = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const { scrollLeft, clientWidth } = container;
    const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
    
    container.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  // Scroll to specific dot/index
  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container || index < 0 || index >= childrenCount) return;
    
    const { scrollWidth } = container;
    const itemWidth = scrollWidth / childrenCount;
    
    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    });
  };

  // Custom CSS for the scroll container
  const containerStyle = {
    display: 'flex',
    overflow: 'auto',
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
    msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
    position: 'relative',
    scrollPadding,
    paddingBottom: showDots ? '2rem' : '0.5rem',
    gap,
  };
  
  // Hide webkit scrollbar
  const hideScrollbarStyle = {
    '::-webkit-scrollbar': {
      display: 'none',
    },
  };

  // Apply scroll-snap if enabled
  const scrollSnapStyle = snapToItems ? {
    scrollSnapType: 'x mandatory',
  } : {};
  
  // Apply item width and scroll-snap-align to children
  const getItemStyle = () => ({
    width: itemWidth === 'auto' ? 'auto' : itemWidth,
    flexShrink: 0,
    scrollSnapAlign: scrollSnap,
    display: 'flex',
    justifyContent: centerItems ? 'center' : 'flex-start',
  });

  // Navigation arrow styles
  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: arrowSize,
    height: arrowSize,
    borderRadius: '50%',
    backgroundColor: arrowBgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <div className={`horizontal-scroll-container ${className}`} style={{ position: 'relative' }}>
      {/* Scroll container */}
      <motion.div
        ref={scrollRef}
        className="horizontal-scroll"
        style={{ ...containerStyle, ...scrollSnapStyle, ...hideScrollbarStyle }}
        drag={dragToScroll ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {React.Children.map(children, (child, index) => (
          <div style={getItemStyle()} key={index}>
            {child}
          </div>
        ))}
      </motion.div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          {showLeftArrow && (
            <button
              className="horizontal-scroll-arrow-left"
              style={{ ...arrowStyle, left: '10px' }}
              onClick={() => scrollTo('left')}
              aria-label="Scroll left"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          {showRightArrow && (
            <button
              className="horizontal-scroll-arrow-right"
              style={{ ...arrowStyle, right: '10px' }}
              onClick={() => scrollTo('right')}
              aria-label="Scroll right"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </>
      )}

      {/* Dot navigation */}
      {showDots && childrenCount > 1 && (
        <div
          className="horizontal-scroll-dots"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '8px 0',
          }}
        >
          {Array.from({ length: childrenCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === activeIndex ? dotColor : `${dotColor}50`,
                border: 'none',
                padding: '0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalScroll;
