import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Testimonial = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "These earbuds are pure bliss. My nights have transformed completely.",
      author: "Alexandra Chen",
      title: "Sleep Researcher",
      avatar: "AC",
      rating: 5
    },
    {
      id: 2,
      quote: "Finally, a product that truly understands silent comfort. Exceptional.",
      author: "Dr. Leo Hayes",
      title: "Neurologist",
      avatar: "LH",
      rating: 5
    },
    {
      id: 3,
      quote: "After struggling with insomnia for years, these earbuds have become my nightly sanctuary.",
      author: "Maya Patel",
      title: "Yoga Instructor",
      avatar: "MP",
      rating: 5
    },
    {
      id: 4,
      quote: "As someone who travels frequently, these have been a game-changer for sleeping on planes.",
      author: "James Wilson",
      title: "Business Traveler",
      avatar: "JW",
      rating: 5
    }
  ];

  // State for managing the carousel
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isMobile, setIsMobile] = useState(false);
  
  // References and animations
  const constraintsRef = useRef(null);
  const progressControls = useAnimation();
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-rotate carousel effect
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        const nextIndex = (current + 1) % testimonials.length;
        setCurrent(nextIndex);
        setDirection(1);
        
        // Animate the progress bar
        progressControls.start({
          scaleX: (nextIndex + 1) / testimonials.length,
          transition: { duration: 0.6, ease: "easeInOut" }
        });
      }, 6000); // Slightly longer for better reading experience
      
      return () => clearTimeout(timer);
    }
  }, [current, isPaused, testimonials.length, progressControls]);

  // Handle manual navigation
  const handleNext = () => {
    const nextIndex = (current + 1) % testimonials.length;
    setCurrent(nextIndex);
    setDirection(1);
    
    // Animate the progress bar
    progressControls.start({
      scaleX: (nextIndex + 1) / testimonials.length,
      transition: { duration: 0.4, ease: "easeInOut" }
    });
  };

  const handlePrev = () => {
    const prevIndex = (current - 1 + testimonials.length) % testimonials.length;
    setCurrent(prevIndex);
    setDirection(-1);
    
    // Animate the progress bar
    progressControls.start({
      scaleX: (prevIndex + 1) / testimonials.length,
      transition: { duration: 0.4, ease: "easeInOut" }
    });
  };

  // Custom rating stars component
  const RatingStars = ({ rating }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            color: i < rating ? 'var(--accent-1-alt)' : 'rgba(212, 190, 152, 0.2)'
          }}
          transition={{ delay: 0.4 + (i * 0.07), duration: 0.3 }}
        >
          <Star size={16} fill={i < rating ? 'currentColor' : 'none'} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="testimonials-section" className="testimonials-section relative py-24 md:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--accent-2)] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-[var(--accent-1)] opacity-5 blur-3xl"></div>
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMhOEI5RTkwIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0yOS41IDQ3LjVMMjkuNSAxMi41TTEyLjUgMjkuNUw0Ny41IDI5LjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header with enhanced styling */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px 0px" }}
        >
          <motion.span 
            className="inline-block text-[var(--accent-1)] font-light tracking-widest text-sm mb-3 uppercase"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--text-primary)] mb-6">
            Experiences Shared. <span className="text-[var(--accent-1)]">Rest Found.</span>
          </h2>
          <motion.p 
            className="text-[var(--text-primary-alt)] max-w-2xl mx-auto text-lg font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our earbuds have transformed sleep and relaxation for people around the world.
          </motion.p>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-[1px] bg-[var(--accent-1)] opacity-30 mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        {/* Testimonial carousel with enhanced design */}
        <div 
          className="relative max-w-4xl mx-auto"
          ref={constraintsRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
        >
          {/* Large quote decoration */}
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--accent-1)] opacity-10 z-10"
            initial={{ opacity: 0, rotateZ: -10 }}
            whileInView={{ opacity: 0.1, rotateZ: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Quote size={isMobile ? 60 : 80} strokeWidth={1} />
          </motion.div>
          
          {/* Carousel */}
          <div className="relative h-[320px] md:h-[280px] lg:h-[260px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                className="absolute inset-0"
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  scale: { duration: 0.6 }
                }}
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) {
                    handleNext();
                  } else if (offset.x > 50) {
                    handlePrev();
                  }
                }}
              >
                <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] p-8 md:p-10 border border-[var(--accent-2)] border-opacity-30 flex flex-col justify-between">
                  {/* Small quote icon */}
                  <div className="absolute top-6 left-6 text-[var(--accent-1)] opacity-20">
                    <Quote size={24} strokeWidth={1} />
                  </div>
                  
                  <motion.blockquote 
                    className="text-xl md:text-2xl lg:text-3xl text-[var(--text-primary)] font-light mb-8 pt-6 pl-4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    "{testimonials[current].quote}"
                  </motion.blockquote>

                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {/* Enhanced avatar */}
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-1-alt)] flex items-center justify-center text-white font-medium text-lg mr-5 shadow-md"
                      whileHover={{ scale: 1.1, boxShadow: "0 8px 20px -5px rgba(139, 158, 144, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      style={{ border: "2px solid rgba(255,255,255,0.8)" }}
                    >
                      {testimonials[current].avatar}
                    </motion.div>
                    
                    <div>
                      <motion.div 
                        className="text-[var(--text-primary)] font-medium text-lg"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                      >
                        {testimonials[current].author}
                      </motion.div>
                      
                      <motion.div 
                        className="text-[var(--accent-1)] font-light"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        {testimonials[current].title}
                      </motion.div>
                      
                      <motion.div 
                        className="mt-2"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                      >
                        <RatingStars rating={testimonials[current].rating} />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced navigation controls */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 md:px-0 md:left-[-50px] md:right-[-50px]">
            <motion.button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] shadow-md border border-[var(--accent-2)] border-opacity-30"
              onClick={handlePrev}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "var(--accent-1)", 
                color: "white",
                boxShadow: "0 5px 15px rgba(139, 158, 144, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={isMobile ? 18 : 22} strokeWidth={1.5} />
            </motion.button>
            
            <motion.button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] shadow-md border border-[var(--accent-2)] border-opacity-30"
              onClick={handleNext}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "var(--accent-1)", 
                color: "white",
                boxShadow: "0 5px 15px rgba(139, 158, 144, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={isMobile ? 18 : 22} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Enhanced progress indicator */}
          <motion.div 
            className="mt-10 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="h-[3px] w-full bg-[var(--accent-2)] bg-opacity-20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--accent-1)]"
                initial={{ scaleX: 1 / testimonials.length }}
                animate={progressControls}
                style={{ 
                  transformOrigin: "left", 
                  scaleX: (current + 1) / testimonials.length,
                  boxShadow: "0 0 10px rgba(139, 158, 144, 0.5)"
                }}
              />
            </div>
            
            {/* Enhanced pagination dots */}
            <div className="mt-6 flex justify-center space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`rounded-full transition-all duration-300 flex items-center justify-center`}
                  style={{
                    width: current === index ? '32px' : '10px',
                    height: '10px',
                    backgroundColor: current === index ? 'var(--accent-1)' : 'var(--accent-2)',
                    opacity: current === index ? 1 : 0.3,
                    boxShadow: current === index ? '0 2px 6px rgba(139, 158, 144, 0.4)' : 'none'
                  }}
                  onClick={() => {
                    setCurrent(index);
                    setDirection(index > current ? 1 : -1);
                    progressControls.start({
                      scaleX: (index + 1) / testimonials.length,
                      transition: { duration: 0.4, ease: "easeInOut" }
                    });
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    opacity: 1,
                    backgroundColor: current === index ? 'var(--accent-1)' : 'var(--accent-1-alt)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  animate={{ 
                    scale: current === index ? 1.1 : 1,
                    width: current === index ? '32px' : '10px'
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={current === index ? "true" : "false"}
                >
                  {current === index && (
                    <motion.span 
                      className="text-white text-[8px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {index + 1}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial