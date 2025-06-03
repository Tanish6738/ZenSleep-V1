import React, { useState } from 'react'
import { Bluetooth, Music, Star, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const HowItWork = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Data for the 3-step process
  const steps = [
    {
      id: 1,
      title: "Align & Connect",
      description: "Seamless Bluetooth pairing with your device for an uninterrupted experience.",
      icon: <Bluetooth size={32} className="text-[#8B9E90]" /> // Replaced emoji with Bluetooth icon
    },
    {
      id: 2,
      title: "Curate Your Soundscape",
      description: "Choose from your preferred sleep/focus apps or select from our library of calming sounds.",
      icon: <Music size={32} className="text-[#8B9E90]" /> // Replaced emoji with Music icon
    },
    {
      id: 3,
      title: "Surrender to Comfort",
      description: "Designed for ultimate, forgotten wear with adaptive softness that shapes to your unique ear.",
      icon: <Star size={32} className="text-[#8B9E90]" /> // Replaced emoji with Headphones icon
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (    <motion.section 
      className="py-20 bg-[#FDFDFC]" 
      initial="hidden"
      id='how-it-works-section'
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-[#2A2A2A] mb-4"
            variants={fadeIn}
          >
            Precision Crafted for Your <span className="text-[#8B9E90]">Calm</span>
          </motion.h2>
          <motion.p 
            className="text-[#1A2D3A] max-w-2xl mx-auto"
            variants={fadeIn}
          >
            The philosophy and craftsmanship behind our earbuds is focused on creating your personal oasis of tranquility.
          </motion.p>
        </motion.div>

        {/* Steps container */}
        <motion.div 
          className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id} 
              className="flex flex-col items-center relative"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Connector line between steps (visible only on desktop) */}
              {step.id < 3 && (
                <motion.div 
                  className="hidden md:block absolute top-16 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-[2px] bg-[#D4BE98] opacity-30 z-0"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 0.3 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                ></motion.div>
              )}
              
              {/* Step number and icon */}
              <motion.div 
                className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#F8F8F4] to-[#C0E0EE] shadow-md mb-6 z-10 relative"
                whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)", scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-24 h-24 rounded-full bg-[#F8F8F4] flex items-center justify-center"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#8B9E90] text-white flex items-center justify-center font-light"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 * step.id, type: "spring", stiffness: 200 }}
                >
                  {step.id}
                </motion.div>
              </motion.div>
              
              {/* Step content */}
              <motion.h3 
                className="text-xl font-medium text-[#2A2A2A] mb-2"
                variants={fadeIn}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-center text-[#1A2D3A] font-light"
                variants={fadeIn}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Innovation details section (expandable in real implementation) */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="border border-[#8B9E90] border-opacity-30 rounded-lg p-6"
            whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
          >
            <motion.div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            >
              <h4 className="text-xl text-[#2A2A2A] font-light">Innovation Details</h4>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-[#8B9E90] text-xl"
              >
                {isDetailsOpen ? <Minus size={20} /> : <Plus size={20} />}
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {isDetailsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <motion.ul 
                    className="grid md:grid-cols-2 gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {[
                      "Crystal-clear audio drivers",
                      "Advanced battery cell (12+ hours)",
                      "Ergonomic pressure-free design",
                      "Medical-grade silicone coating"
                    ].map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        variants={item}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-[#8B9E90] rounded-full mr-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                        ></motion.div>
                        <span className="text-[#1A2D3A] font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HowItWork