import React, { useEffect, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  // Use refs to store event handlers for proper cleanup
  const eventHandlersRef = useRef({});
  
  useEffect(() => {
    // Store all event handlers in ref for proper cleanup
    const handlers = eventHandlersRef.current;
    
    // Throttle function to limit execution frequency
    const throttle = (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    // Smooth scrolling for anchor links
    handlers.handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          try {
            // Add a small delay for better UX
            setTimeout(() => {
              window.history.pushState(null, null, targetId);
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }, 100);
          } catch (error) {
            console.warn('Smooth scroll error:', error);
            // Fallback to regular scroll if smooth scroll fails
            window.location.hash = targetId;
          }
        }
      }
    };

    // Add scroll to top button functionality
    handlers.handleScrollToTop = (e) => {
      e.stopPropagation();
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        console.warn('Scroll to top error:', error);
        // Fallback for browsers without smooth scrolling
        window.scrollTo(0, 0);
      }
    };

    // Create and append scroll to top button
    const createScrollToTopButton = () => {
      // Check if button already exists to prevent duplicates
      const existingButton = document.querySelector('.scroll-to-top-btn');
      if (existingButton) return existingButton;
      
      const scrollToTopButton = document.createElement('button');
      scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
      scrollToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      scrollToTopButton.className = 'scroll-to-top-btn';
      scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 90px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent-1);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        outline: none;
      `;
      
      document.body.appendChild(scrollToTopButton);
      return scrollToTopButton;
    };

    // Update button visibility based on scroll position (throttled)
    handlers.handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
      
      if (!scrollToTopBtn) return;
      
      if (scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
      }
    }, 100); // Throttle to 100ms

    // Add parallax effect to certain elements (throttled)
    handlers.handleParallaxScroll = throttle(() => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      if (parallaxElements.length === 0) return;
      
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        try {
          const speed = parseFloat(element.getAttribute('data-parallax-speed') || 0.2);
          const offset = scrollY * speed;
          const direction = element.getAttribute('data-parallax-direction') || 'vertical';
          
          if (direction === 'horizontal') {
            element.style.transform = `translateX(${offset}px)`;
          } else {
            element.style.transform = `translateY(${offset}px)`;
          }
        } catch (error) {
          console.warn('Parallax effect error:', error);
        }
      });
    }, 50); // More frequent updates for smoother parallax

    // Add scroll snap effect to section elements if needed
    const addScrollSnap = () => {
      // Only add this if data-scroll-snap attribute is set on the body
      const snapType = document.body.getAttribute('data-scroll-snap');
      if (!snapType) return;
      
      const style = document.createElement('style');
      style.id = 'scroll-snap-style';
      
      // Different snap behaviors based on attribute value
      let snapSettings;
      switch (snapType) {
        case 'strict':
          snapSettings = `
            html {
              scroll-snap-type: y mandatory;
            }
            section {
              scroll-snap-align: start;
              scroll-snap-stop: always;
            }
          `;
          break;
        case 'proximity':
        default:
          snapSettings = `
            html {
              scroll-snap-type: y proximity;
            }
            section {
              scroll-snap-align: start;
            }
          `;
          break;
      }
      
      style.innerHTML = snapSettings;
      
      // Only append if not already present
      if (!document.getElementById('scroll-snap-style')) {
        document.head.appendChild(style);
      }
    };

    // Smooth scroll for mousewheel with inertia
    const smoothMousewheel = () => {
      // Check for browser support
      if ('scrollBehavior' in document.documentElement.style) return null;
      
      // For browsers without native smooth scrolling
      let scrolling = false;
      let lastScrollTime = 0;
      let scrollDistance = 0;
      const scrollInertia = 0.85; // Value between 0 and 1, higher = more inertia
      
      const animateScroll = () => {
        if (Math.abs(scrollDistance) < 0.5) {
          scrolling = false;
          return;
        }
        
        window.scrollBy(0, scrollDistance);
        scrollDistance *= scrollInertia;
        requestAnimationFrame(animateScroll);
      };
      
      handlers.onWheel = (e) => {
        e.preventDefault();
        
        const now = performance.now();
        const delta = e.deltaY;
        const timeDiff = now - lastScrollTime;
        
        // Apply more force if user is scrolling rapidly
        const force = timeDiff < 50 ? 1.5 : 1;
        
        scrollDistance = delta * 0.5 * force; // Scale the scroll amount
        lastScrollTime = now;
        
        if (!scrolling) {
          scrolling = true;
          requestAnimationFrame(animateScroll);
        }
      };
      
      // Add the event listener
      window.addEventListener('wheel', handlers.onWheel, { passive: false });
      
      return () => window.removeEventListener('wheel', handlers.onWheel);
    };

    // Add touch swipe navigation for mobile devices
    const addTouchNavigation = () => {
      let touchStartY = 0;
      let touchEndY = 0;
      const minSwipeDistance = 50;
      
      handlers.touchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      
      handlers.touchEnd = (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      };
      
      const handleSwipe = () => {
        const distance = touchStartY - touchEndY;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        // Get all section elements for navigation
        const sections = Array.from(document.querySelectorAll('section'));
        if (sections.length === 0) return;
        
        // Find current section based on scroll position
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const currentIdx = sections.findIndex(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > viewportHeight / 2;
        });
        
        if (currentIdx === -1) return;
        
        let targetSection;
        if (distance > 0 && currentIdx < sections.length - 1) {
          // Swiping up, go to next section
          targetSection = sections[currentIdx + 1];
        } else if (distance < 0 && currentIdx > 0) {
          // Swiping down, go to previous section
          targetSection = sections[currentIdx - 1];
        }
        
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      document.addEventListener('touchstart', handlers.touchStart, { passive: true });
      document.addEventListener('touchend', handlers.touchEnd, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', handlers.touchStart);
        document.removeEventListener('touchend', handlers.touchEnd);
      };
    };

    // Initialize everything
    document.addEventListener('click', handlers.handleAnchorClick);
    const scrollToTopBtn = createScrollToTopButton();
    window.addEventListener('scroll', handlers.handleScroll);
    window.addEventListener('scroll', handlers.handleParallaxScroll);
    addScrollSnap();
    const wheelCleanup = smoothMousewheel();
    const touchCleanup = addTouchNavigation();

    // Add hover effect to scroll to top button
    if (scrollToTopBtn) {
      handlers.buttonMouseEnter = () => {
        scrollToTopBtn.style.backgroundColor = 'var(--accent-1-alt)';
        scrollToTopBtn.style.transform = 'translateY(-5px)';
      };
      
      handlers.buttonMouseLeave = () => {
        scrollToTopBtn.style.backgroundColor = 'var(--accent-1)';
        scrollToTopBtn.style.transform = 'translateY(0)';
      };
      
      scrollToTopBtn.addEventListener('click', handlers.handleScrollToTop);
      scrollToTopBtn.addEventListener('mouseenter', handlers.buttonMouseEnter);
      scrollToTopBtn.addEventListener('mouseleave', handlers.buttonMouseLeave);
    }

    // Call handleScroll once to set initial button state
    handlers.handleScroll();

    // Check if URL contains hash on load and scroll to it
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 500); // Delay to ensure page is loaded
      }
    }

    // Cleanup function
    return () => {
      document.removeEventListener('click', handlers.handleAnchorClick);
      window.removeEventListener('scroll', handlers.handleScroll);
      window.removeEventListener('scroll', handlers.handleParallaxScroll);
      
      if (scrollToTopBtn) {
        try {
          scrollToTopBtn.removeEventListener('click', handlers.handleScrollToTop);
          scrollToTopBtn.removeEventListener('mouseenter', handlers.buttonMouseEnter);
          scrollToTopBtn.removeEventListener('mouseleave', handlers.buttonMouseLeave);
          document.body.removeChild(scrollToTopBtn);
        } catch (error) {
          console.warn('Error cleaning up scroll button:', error);
        }
      }
      
      if (wheelCleanup) wheelCleanup();
      if (touchCleanup) touchCleanup();
      
      // Remove scroll snap style if it exists
      const snapStyle = document.getElementById('scroll-snap-style');
      if (snapStyle) snapStyle.remove();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
