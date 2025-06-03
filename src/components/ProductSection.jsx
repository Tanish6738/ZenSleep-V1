import React from 'react'
import { motion } from 'framer-motion'
import { Feather, Shield, Battery, Bluetooth, EyeOff, Ear } from 'lucide-react'

const ProductSection = () => {
  // Product features data
  const features = [
    {
      id: 1,
      title: "Weightless Comfort",
      description: "Feather-light, ergonomic design for any sleep position.",
      icon: <Feather size={32} className="text-[#8B9E90]" />
    },
    {
      id: 2,
      title: "Pure Silence",
      description: "Advanced passive noise cancellation, truly isolates.",
      icon: <Shield size={32} className="text-[#8B9E90]" />
    },
    {
      id: 3,
      title: "Enduring Serenity",
      description: "All-night battery life, no interruptions.",
      icon: <Battery size={32} className="text-[#8B9E90]" />
    },
    {
      id: 4,
      title: "Seamless Integration",
      description: "Effortless pairing, intuitive control.",
      icon: <Bluetooth size={32} className="text-[#8B9E90]" />
    },
    {
      id: 5,
      title: "Mindful Design",
      description: "No distracting lights, ultra-low profile.",
      icon: <EyeOff size={32} className="text-[#8B9E90]" />
    },
    {
      id: 6,
      title: "Adaptive Fit",
      description: "Customizable ear tips for a perfect seal.",
      icon: <Ear size={32} className="text-[#8B9E90]" />
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (    <motion.section 
      className="py-24 bg-[#F8F8F4]"
      id="product-section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          variants={headerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-[#2A2A2A] mb-4"
            variants={headerVariants}
          >
            Redefining Rest: <span className="text-[#8B9E90]">The Zen of Sound</span>
          </motion.h2>
          <motion.p 
            className="text-[#1A2D3A] max-w-2xl mx-auto"
            variants={headerVariants}
          >
            Designed with meticulous attention to every detail, our earbuds transform your sleep experience through innovative features.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              className={`bg-[#FDFDFC] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#C0E0EE] border-opacity-30 flex flex-col items-center text-center ${
                index === features.length - 1 && features.length % 3 === 1 
                  ? "md:col-span-2 lg:col-span-1 lg:mx-auto lg:w-80" 
                  : ""
              }`}
              variants={item}
              whileHover={{ 
                y: -8,
                boxShadow: "0 10px 25px rgba(139, 158, 144, 0.15)",
                borderColor: "#8B9E90" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F8F8F4] to-[#C0E0EE] flex items-center justify-center mb-5"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2 + (0.1 * feature.id), 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  {feature.icon}
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-medium text-[#2A2A2A] mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + (0.1 * feature.id), duration: 0.5 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-[#1A2D3A] font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + (0.1 * feature.id), duration: 0.5 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.button 
            className="px-8 py-3 bg-transparent border border-[#8B9E90] text-[#8B9E90] hover:bg-[#8B9E90] hover:text-white rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "#8B9E90", color: "white" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ProductSection