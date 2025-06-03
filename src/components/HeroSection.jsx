import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <div className="hero-section" 
      id='hero-section'
      style={{ 
      backgroundColor: '#F8F8F4', 
      padding: '80px 0',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-[#2A2A2A] leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Awaken Refreshed.
            </motion.span>
            <motion.span 
              className="block text-[#8B9E90]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Engineered for True Rest.
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[#1A2D3A] mb-10 font-light max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Experience a new dimension of comfort and silence, designed for your deepest sleep.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <motion.button 
              className="px-8 py-3 bg-[#8B9E90] hover:bg-[#7A8D7F] text-white rounded-full shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Discover Your Best Sleep
            </motion.button>
            <motion.button 
              className="px-8 py-3 bg-transparent border border-[#8B9E90] text-[#8B9E90] hover:bg-[#8B9E90] hover:text-white rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#8B9E90", color: "white" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore Features
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Visual/Image */}
        <motion.div 
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-[#F8F8F4] to-[#C0E0EE] rounded-full w-[400px] h-[400px] mx-auto flex items-center justify-center shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            {/* This would be replaced with an actual image of the earbuds */}
            <div className="text-center">
              <div className="relative">
                <motion.div 
                  className="w-64 h-64 bg-[#A0DCDC] opacity-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <div className="text-[#2A2A2A] font-light relative">
                  {/* Replaced emoji with SVG icon */}
                  <motion.div 
                    className="text-6xl flex justify-center"
                    initial={{ y: 10 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B9E90]">
                      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </motion.div>
                  <motion.p 
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    Wireless Sleep Earbuds
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection