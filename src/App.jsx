import { useEffect, useState } from 'react'
import Landing from './Pages/Landing'
import SmoothScroll from './components/SmoothScroll'
import ScrollIndicator from './components/ScrollIndicator'

const App = () => {
  // Set up enhanced scrolling effects
  useEffect(() => {
    // Add data attributes for scroll effects
    const setupScrollEffects = () => {
      // Enable scroll snap on body if needed
      document.body.setAttribute('data-scroll-snap', 'proximity');
      
      // Add parallax effects to background elements
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        if (index % 2 === 0) {
          // Background elements with parallax
          const bgElements = section.querySelectorAll('.absolute, .bg-element');
          bgElements.forEach(el => {
            el.setAttribute('data-parallax', 'true');
            el.setAttribute('data-parallax-speed', '0.05');
          });
        } else {
          // Alternate direction for odd sections
          const bgElements = section.querySelectorAll('.absolute, .bg-element');
          bgElements.forEach(el => {
            el.setAttribute('data-parallax', 'true');
            el.setAttribute('data-parallax-speed', '-0.03');
            el.setAttribute('data-parallax-direction', 'horizontal');
          });
        }
      });
      
      // Add smooth transitions to interactive elements
      const interactiveElements = document.querySelectorAll('button, a, .interactive');
      interactiveElements.forEach(el => {
        el.classList.add('smooth-transition');
      });
    };
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.body.classList.add('reduced-motion');
      document.body.removeAttribute('data-scroll-snap');
    } else {
      // Initialize scroll effects with a short delay to ensure DOM is loaded
      setTimeout(setupScrollEffects, 500);
    }
    
    // Handle browser back/forward navigation for smooth scrolling to hash
    const handleNavigation = () => {
      if (window.location.hash) {
        setTimeout(() => {
          const targetElement = document.querySelector(window.location.hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    };
    
    window.addEventListener('popstate', handleNavigation);
    
    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Detect if on mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    // Check if device has touch capability
    const detectTouch = () => {
      setIsTouch('ontouchstart' in window || 
                 navigator.maxTouchPoints > 0 || 
                 navigator.msMaxTouchPoints > 0);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      detectTouch();
    };
    
    // Initial detection
    detectTouch();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SmoothScroll disableAutoSectionNav={isMobile && isTouch}>
      <ScrollIndicator 
        showPercentage={false} 
        height={3}
      />
      <Landing />
    </SmoothScroll>
  )
}

export default App