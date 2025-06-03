import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Common header height constant for consistent offset calculations
const HEADER_HEIGHT = 80;

/**
 * ScrollToSection component for creating navigation that smoothly scrolls to page sections.
 * Can be used for creating fixed navigation, table of contents, or floating action buttons.
 */
const ScrollToSection = ({
  sections = [], // Array of {id, label} objects
  activeClass = 'active', // Class to apply to the active link
  containerClassName = '', // Additional classes for the container
  itemClassName = '', // Additional classes for each navigation item
  orientation = 'vertical', // 'vertical' or 'horizontal'
  showLabels = true, // Whether to show text labels
  showIcons = false, // Whether to show icons
  position = 'right', // 'left', 'right', 'top', 'bottom', 'center'
  offset = 20, // Offset from the edge of the screen (px)
  highlightActive = true, // Whether to highlight the active section
  alwaysVisible = false, // Whether the navigation is always visible
  fadeIn = true, // Whether to fade in the navigation after scrolling
  customIcons = {}, // Custom icons for each section by ID
  onClick = null, // Optional callback when a navigation item is clicked
}) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipDelay, setTooltipDelay] = useState(null);
  const throttleRef = useRef(null);
  const containerRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Throttle function to improve performance
  const throttle = (callback, delay) => {
    if (throttleRef.current) return;
    
    throttleRef.current = setTimeout(() => {
      callback();
      throttleRef.current = null;
    }, delay);
  };
  
  // Monitor scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      throttle(() => {
        // Show/hide navigation based on scroll position
        if (!alwaysVisible) {
          setIsVisible(window.scrollY > 300);
        }
        
        if (!highlightActive) return;
        
        // Find the section currently in view
        const sectionElements = sections.map(section => ({
          id: section.id,
          element: document.getElementById(section.id),
        })).filter(item => item.element);
        
        if (sectionElements.length === 0) return;
        
        // Get the section closest to the top of the viewport
        const { innerHeight } = window;
        let currentSection = '';
        
        for (const { id, element } of sectionElements) {
          const rect = element.getBoundingClientRect();
          // Consider a section in view if its top is within the first 1/3 of the viewport
          // or if we're near the bottom of the page
          if (
            (rect.top <= innerHeight / 3 && rect.bottom > 0) ||
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100
          ) {
            currentSection = id;
          }
        }
        
        // Only update if needed to avoid unnecessary re-renders
        if (currentSection && currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }, isMobile ? 150 : 100); // Slightly longer throttle on mobile for better performance
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [sections, activeSection, alwaysVisible, highlightActive, isMobile]);

  // Scroll to section when a navigation item is clicked
  const scrollToSection = (id, e) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (!element) return;
    
    // Account for fixed header offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL hash without scrolling
    if (history.pushState) {
      history.pushState(null, null, `#${id}`);
    } else {
      location.hash = `#${id}`;
    }
    
    // Call custom click handler if provided
    if (onClick) onClick(id);
  };

  // Handle mouse enter on an item with delay for tooltip
  const handleMouseEnter = (id) => {
    clearTimeout(tooltipDelay);
    setTooltipDelay(setTimeout(() => setHoveredItem(id), 200)); // Show tooltip after 200ms delay
  };

  // Handle mouse leave on an item with delay for tooltip
  const handleMouseLeave = () => {
    clearTimeout(tooltipDelay);
    setTooltipDelay(setTimeout(() => setHoveredItem(null), 300)); // Hide tooltip after 300ms delay
  };

  // Handle touch interactions for mobile devices
  const handleTouchStart = (id) => {
    clearTimeout(tooltipDelay);
    setHoveredItem(id);
  };

  const handleTouchEnd = () => {
    clearTimeout(tooltipDelay);
    setTooltipDelay(setTimeout(() => setHoveredItem(null), 1500)); // Keep tooltip visible longer on mobile
  };

  // Determine container position and styles
  const getContainerStyles = () => {
    let positionStyles = {};
    
    switch (position) {
      case 'left':
        positionStyles = {
          left: isMobile ? '10px' : `${offset}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
        };
        break;
      case 'right':
        positionStyles = {
          right: isMobile ? '10px' : `${offset}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
        };
        break;
      case 'top':
        positionStyles = {
          top: isMobile ? '10px' : `${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'row',
        };
        break;
      case 'bottom':
        positionStyles = {
          bottom: isMobile ? '10px' : `${offset}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'row',
        };
        break;
      case 'center':
        positionStyles = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
        };
        break;
      default:
        positionStyles = {
          right: isMobile ? '10px' : `${offset}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
        };
    }
    
    return {
      position: 'fixed',
      display: 'flex',
      gap: isMobile ? '8px' : '10px',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      ...positionStyles,
      touchAction: 'manipulation', // Improved touch handling
    };
  };

  // Default icon for sections
  const defaultIcon = (
    <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );

  if (sections.length === 0) return null;

  return (
    <motion.nav
      ref={containerRef}
      className={`scroll-to-section ${containerClassName}`}
      style={getContainerStyles()}
      initial={{ opacity: alwaysVisible ? 1 : 0 }}
      animate={{ 
        opacity: fadeIn ? (isVisible ? 1 : 0) : 1,
        y: fadeIn ? (isVisible ? 0 : 20) : 0
      }}
      transition={{ duration: 0.3 }}
      aria-label="Page navigation"
    >
      {sections.map(({ id, label, icon }) => (
        <div 
          key={id} 
          className="relative"
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => handleTouchStart(id)}
          onTouchEnd={handleTouchEnd}
        >
          <motion.a
            href={`#${id}`}
            className={`
              scroll-to-section-item 
              ${itemClassName} 
              ${activeSection === id ? activeClass : ''}
            `}
            onClick={(e) => scrollToSection(id, e)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: isMobile ? '8px' : '10px', // Increased touch target size
              color: activeSection === id ? 'var(--accent-1)' : 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: activeSection === id ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              width: isMobile ? '12px' : 'auto', // Slightly larger for mobile
              height: isMobile ? '12px' : 'auto',
              minWidth: isMobile ? '24px' : 'auto', // Ensure minimum touch target size
              minHeight: isMobile ? '24px' : 'auto',
            }}
            aria-label={`Navigate to ${label} section`}
          >
            {showIcons && (
              <span className="scroll-to-section-icon">
                {customIcons[id] || icon || defaultIcon}
              </span>
            )}
            
            {showLabels && !isMobile && (
              <span className="scroll-to-section-label">{label}</span>
            )}
          </motion.a>
          
          {/* Tooltip for section name on hover */}
          <AnimatePresence>
            {(hoveredItem === id || (isMobile && activeSection === id)) && !showLabels && (
              <motion.div
                initial={{ opacity: 0, x: position === 'left' ? 20 : position === 'right' ? -20 : 0, y: position === 'top' ? 20 : position === 'bottom' ? -20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: position === 'left' ? 20 : position === 'right' ? -20 : 0, y: position === 'top' ? 20 : position === 'bottom' ? -20 : 0 }}
                transition={{ duration: 0.2 }}
                className="scroll-to-section-tooltip"
                style={{
                  position: 'absolute',
                  zIndex: 60,
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  left: position === 'right' ? 'auto' : position === 'left' ? '100%' : '50%',
                  right: position === 'left' ? 'auto' : position === 'right' ? '100%' : 'auto',
                  top: position === 'bottom' ? 'auto' : position === 'top' ? '100%' : '50%',
                  bottom: position === 'top' ? 'auto' : position === 'bottom' ? '100%' : 'auto',
                  transform: 
                    position === 'center' || position === 'top' || position === 'bottom' 
                      ? 'translateX(-50%)' 
                      : position === 'left' || position === 'right' 
                        ? 'translateY(-50%)' 
                        : 'none',
                  marginLeft: position === 'left' ? '12px' : 0,
                  marginRight: position === 'right' ? '12px' : 0,
                  marginTop: position === 'top' ? '12px' : 0,
                  marginBottom: position === 'bottom' ? '12px' : 0,
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(139, 158, 144, 0.2)',
                }}
              >
                {label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.nav>
  );
};

export default ScrollToSection;
