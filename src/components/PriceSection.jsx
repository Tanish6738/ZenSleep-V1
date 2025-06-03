import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Truck, Clock, ArrowRight } from 'lucide-react'

const PriceSection = () => {
  const [selectedBundle, setSelectedBundle] = useState('standard');
  
  // Pricing data for different bundles
  const bundles = {
    standard: {
      name: "The Serenity Pair",
      price: 149,
      originalPrice: 179,
      description: "Our flagship sleep earbuds, designed for ultimate comfort and all-night wear.",
      includes: [
        "Premium Sleep Earbuds",
        "Charging Case",
        "3 Sizes of Soft Tips",
        "USB-C Charging Cable",
        "Travel Pouch"
      ]
    },
    premium: {
      name: "Deep Rest Duo",
      price: 199,
      originalPrice: 249,
      description: "Our complete sleep solution with premium accessories for the perfect night's rest.",
      includes: [
        "Premium Sleep Earbuds",
        "Charging Case",
        "5 Sizes of Soft Tips",
        "USB-C Charging Cable",
        "Premium Travel Case",
        "Sleep Mask",
        "Guided Sleep Meditations"
      ]
    },
    family: {
      name: "Family Rest Pack",
      price: 279,
      originalPrice: 358,
      description: "Share the gift of better sleep with a pair for you and someone you care about.",
      includes: [
        "2x Premium Sleep Earbuds",
        "2x Charging Cases",
        "5 Sizes of Soft Tips",
        "2x USB-C Charging Cables",
        "2x Travel Pouches",
        "Premium Support"
      ]
    }
  };

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

  // Calculate savings
  const calculateSavings = (original, current) => {
    return original - current;
  };

  // Calculate savings percentage
  const calculatePercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-24 bg-[#FDFDFC] relative overflow-hidden" id="pricing-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C0E0EE]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B9E90]/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#2A2A2A] mb-4">
            Acquire Your <span className="text-[#8B9E90]">Tranquility</span>
          </h2>
          <p className="text-[#1A2D3A] max-w-2xl mx-auto">
            Choose the perfect option for your journey to better rest and peaceful nights.
          </p>
        </motion.div>

        {/* Bundle selection tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {Object.keys(bundles).map((bundleKey) => (
            <motion.button
              key={bundleKey}
              className={`px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 ${
                selectedBundle === bundleKey 
                  ? 'bg-[#8B9E90] text-white shadow-md' 
                  : 'bg-white text-[#1A2D3A] border border-[#C0E0EE] border-opacity-30 hover:bg-[#F8F8F4]'
              }`}
              onClick={() => setSelectedBundle(bundleKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {bundles[bundleKey].name}
            </motion.button>
          ))}
        </motion.div>

        {/* Selected bundle details */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-[#C0E0EE] border-opacity-30 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={selectedBundle}
          layout
        >
          <div className="grid md:grid-cols-5 gap-6">
            {/* Product image - 2 columns on md screens */}
            <div className="md:col-span-2 p-8 flex items-center justify-center bg-gradient-to-br from-[#F8F8F4] to-[#FDFDFC]">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.div 
                  className="w-64 h-64 rounded-full bg-[#C0E0EE]/20 flex items-center justify-center"
                  animate={{ 
                    boxShadow: ['0px 0px 0px rgba(192, 224, 238, 0.3)', '0px 0px 30px rgba(192, 224, 238, 0.5)', '0px 0px 0px rgba(192, 224, 238, 0.3)'] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {/* This is where you'd put the actual product image */}
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18" stroke="#8B9E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z" stroke="#8B9E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                
                {/* Discount badge */}
                <motion.div 
                  className="absolute -top-2 -right-2 bg-[#D4BE98] text-white text-sm font-medium rounded-full px-3 py-1 shadow-md"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                >
                  Save {calculatePercentage(bundles[selectedBundle].originalPrice, bundles[selectedBundle].price)}%
                </motion.div>
              </motion.div>
            </div>
            
            {/* Bundle details - 3 columns on md screens */}
            <div className="md:col-span-3 p-8">
              <div className="mb-6">
                <motion.h3 
                  className="text-2xl font-medium text-[#2A2A2A] mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {bundles[selectedBundle].name}
                </motion.h3>
                <motion.p 
                  className="text-[#1A2D3A] mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {bundles[selectedBundle].description}
                </motion.p>
                <motion.div 
                  className="flex items-baseline mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="text-4xl font-light text-[#2A2A2A]">${bundles[selectedBundle].price}</span>
                  <span className="ml-2 text-lg line-through text-[#1A2D3A] opacity-50">${bundles[selectedBundle].originalPrice}</span>
                  <span className="ml-2 text-sm bg-[#8B9E90]/10 text-[#8B9E90] px-2 py-1 rounded">
                    Save ${calculateSavings(bundles[selectedBundle].originalPrice, bundles[selectedBundle].price)}
                  </span>
                </motion.div>
              </div>
              
              {/* What's included */}
              <motion.div 
                className="mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h4 className="text-sm uppercase text-[#1A2D3A] opacity-70 mb-3">What's Included</h4>
                <ul className="space-y-2">
                  {bundles[selectedBundle].includes.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      variants={itemVariants}
                    >
                      <CheckCircle size={18} className="text-[#8B9E90] mr-2 flex-shrink-0" />
                      <span className="text-[#1A2D3A]">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* CTA Button */}
              <motion.button 
                className="w-full py-4 bg-[#8B9E90] hover:bg-[#7b8d80] text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(139, 158, 144, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span>Begin Your Best Sleep</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Guarantees and additional information */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { 
              icon: Shield, 
              title: "Your Journey to Rest, Guaranteed", 
              description: "30-day satisfaction guarantee with hassle-free returns" 
            },
            { 
              icon: Truck, 
              title: "Swift & Discreet Delivery", 
              description: "Free shipping on all orders with eco-friendly packaging" 
            },
            { 
              icon: Clock, 
              title: "Built to Last", 
              description: "2-year warranty against manufacturing defects" 
            },
            { 
              icon: CheckCircle, 
              title: "Expert Support", 
              description: "24/7 dedicated customer care for all your questions" 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-[#C0E0EE] border-opacity-30 flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="w-12 h-12 rounded-full bg-[#8B9E90]/10 flex items-center justify-center mb-4">
                <item.icon size={24} className="text-[#8B9E90]" />
              </div>
              <h3 className="text-[#2A2A2A] font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-[#1A2D3A]">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PriceSection