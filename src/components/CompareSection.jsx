import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, AlertTriangle, Clock, ChevronRight } from 'lucide-react'

const CompareSection = () => {
  // Define comparison data
  const comparisonData = [
    {
      feature: "Comfort",
      regular: { 
        text: "Rigid / Pressure", 
        icon: X, 
        status: "negative" 
      },
      sleep: { 
        text: "Adaptive Softness", 
        icon: Check, 
        status: "positive" 
      }
    },
    {
      feature: "Design",
      regular: { 
        text: "Protruding / Lights", 
        icon: AlertTriangle, 
        status: "warning" 
      },
      sleep: { 
        text: "Discreet / Zero Glow", 
        icon: Check, 
        status: "positive" 
      }
    },
    {
      feature: "Battery",
      regular: { 
        text: "Limited Use", 
        icon: Clock, 
        status: "warning" 
      },
      sleep: { 
        text: "All-Night Endurance", 
        icon: Check, 
        status: "positive" 
      }
    },
    {
      feature: "Sound",
      regular: { 
        text: "Distracting", 
        icon: AlertTriangle, 
        status: "warning" 
      },
      sleep: { 
        text: "Immersive Calm", 
        icon: Check, 
        status: "positive" 
      }
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Mobile-specific animation variants
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Icon configuration based on status
  const getIconStyles = (status) => {
    switch(status) {
      case "positive":
        return "text-[#8B9E90] bg-[#8B9E90]/10";
      case "negative":
        return "text-red-500 bg-red-50";
      case "warning":
        return "text-amber-500 bg-amber-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F4]" id="compare-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2A2A2A] mb-3 md:mb-4 px-2">
            Beyond Ordinary: <span className="text-[#8B9E90] block sm:inline">The Sleep Earbuds Difference</span>
          </h2>
          <p className="text-[#1A2D3A] text-sm sm:text-base max-w-2xl mx-auto px-2">
            See how our specially engineered sleep earbuds compare to conventional options for a truly transformative rest experience.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Table header - visible on larger screens */}
          <div className="hidden md:grid grid-cols-3 gap-4 mb-6 px-4">
            <div className="font-medium text-[#1A2D3A]">Feature</div>
            <div className="font-medium text-[#1A2D3A]">Regular Earbuds</div>
            <div className="font-medium text-[#1A2D3A]">Sleep Earbuds</div>
          </div>

          {/* Table rows */}
          {comparisonData.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`grid md:grid-cols-3 gap-4 mb-6 md:mb-6 rounded-xl overflow-hidden ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#FDFDFC]'
              } shadow-sm border border-[#C0E0EE] border-opacity-20`}
            >
              {/* Feature name - styled differently for mobile */}
              <div className="font-medium text-[#2A2A2A] md:self-center p-4 pb-1 md:pb-4 md:p-4 border-b md:border-b-0 border-[#C0E0EE] border-opacity-20 flex justify-between items-center">
                {item.feature}
                <ChevronRight size={16} className="text-[#8B9E90] md:hidden" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 p-3 md:p-4 gap-4">
                {/* Regular earbuds - mobile optimized */}
                <motion.div 
                  className="flex items-center p-2 rounded-lg"
                  variants={mobileItemVariants}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${getIconStyles(item.regular.status)}`}>
                    <item.regular.icon size={16} />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-[#1A2D3A] opacity-70 block md:hidden">Regular Earbuds</span>
                    <span className="text-[#1A2D3A] text-sm sm:text-base">{item.regular.text}</span>
                  </div>
                </motion.div>

                {/* Sleep earbuds - mobile optimized */}
                <motion.div 
                  className="flex items-center p-2 bg-[#8B9E90]/5 rounded-lg"
                  variants={mobileItemVariants}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${getIconStyles(item.sleep.status)}`}>
                    <item.sleep.icon size={16} />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-[#8B9E90] block md:hidden">Sleep Earbuds</span>
                    <span className="text-[#1A2D3A] text-sm sm:text-base font-medium">{item.sleep.text}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Additional features unique to sleep earbuds */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <motion.div 
              className="inline-block bg-[#8B9E90]/10 text-[#8B9E90] px-5 sm:px-6 py-2 sm:py-3 rounded-full mb-6 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">Plus many more exclusive features</span>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
              variants={containerVariants}
            >
              {['Hypoallergenic Material', 'Custom Sound Profiles', 'Temperature Regulation', 'Pressure-Free Design'].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-[#C0E0EE] border-opacity-20"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#8B9E90]/10 flex items-center justify-center mb-2 mx-auto">
                    <Check size={16} className="text-[#8B9E90]" />
                  </div>
                  <p className="text-xs sm:text-sm text-center text-[#1A2D3A]">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="mt-12 md:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-[#8B9E90] hover:bg-[#7b8d80] text-white rounded-full shadow-md transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 158, 144, 0.4)" }}
              whileTap={{ scale: 0.96 }}
            >
              Experience the Difference
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompareSection