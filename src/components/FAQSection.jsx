import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, PlusCircle } from 'lucide-react'

const FAQSection = () => {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ open/closed
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do the sleep earbuds stay in place during the night?",
      answer: "Our sleep earbuds feature an ergonomic design with ultra-soft silicone tips in multiple sizes to ensure a perfect fit. The low-profile shape nestles naturally in your ear, creating a secure but gentle seal that stays in place even if you're a side sleeper or move frequently during the night. The lightweight materials (just 4.5 grams per bud) also minimize the feeling of pressure, making them virtually unnoticeable as you rest."
    },
    {
      question: "What's the battery life, and how does charging work?",
      answer: "The earbuds provide up to 10 hours of continuous playback on a single charge—more than enough for a full night's sleep. The premium charging case adds an additional 30 hours, meaning you can go several nights without needing to plug in. A quick 15-minute charge provides up to 3 hours of use, perfect for those nights when you forgot to charge. The case uses USB-C for fast, convenient charging and includes LED indicators to show battery status at a glance."
    },
    {
      question: "Are they noise-cancelling, and can I still hear important sounds?",
      answer: "Our sleep earbuds use passive noise isolation rather than active noise cancellation, which provides a more natural, comfortable experience for sleep. This design blocks most ambient noise while still allowing you to hear important sounds like alarm clocks or smoke detectors. For those who need complete awareness, our companion app offers an ambient monitoring mode that can be set to automatically pause audio when certain loud sounds (like a baby crying or doorbell) are detected."
    },
    {
      question: "What audio formats are supported and how do I control them?",
      answer: "The earbuds connect via Bluetooth 5.2 and support all standard audio formats. They work seamlessly with any sleep sound app, meditation guide, or music player on your phone or tablet. Control is handled through gentle touch sensors on each earbud, which can be customized in our app to perform different functions based on taps or holds. For sleep, many users prefer to set their audio before bedtime and let it play or fade out naturally, minimizing the need for middle-of-the-night adjustments."
    },
    {
      question: "What if they're not comfortable for me? Is there a return policy?",
      answer: "Your comfort is our priority. We offer a 30-day satisfaction guarantee with hassle-free returns. If for any reason you're not completely satisfied, simply return the earbuds in their original packaging for a full refund—no questions asked. Additionally, all earbuds come with our 2-year warranty against manufacturing defects. Our sleep specialists are also available 24/7 to help with fit adjustments or comfort tips to ensure you have the best possible experience."
    },
    {
      question: "How do these differ from regular wireless earbuds?",
      answer: "Unlike regular earbuds designed primarily for daytime use, our sleep earbuds are specifically engineered for nighttime comfort and rest promotion. Key differences include the ultra-thin profile (70% thinner than standard earbuds) that allows for comfortable side-sleeping, specialized materials that prevent irritation during prolonged wear, absence of sleep-disrupting LED lights, optimized sound profiles for sleep-inducing frequencies, and extended battery life optimized for all-night use. They also feature gentler volume limits to protect your hearing during vulnerable sleep states."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]  // custom cubic-bezier for smoother feel
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-[#F8F8F4] relative overflow-hidden" id="faq-section">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#C0E0EE]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#8B9E90]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        ></motion.div>
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
            Clarity on Your <span className="text-[#8B9E90]">Comfort</span>
          </h2>
          <p className="text-[#1A2D3A] max-w-2xl mx-auto">
            Find answers to common questions about our sleep earbuds and how they can transform your rest experience.
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`mb-5 bg-white rounded-xl overflow-hidden border border-[#C0E0EE] border-opacity-20 shadow-sm
                ${openFAQ === index ? 'shadow-md ring-1 ring-[#8B9E90]/20' : 'hover:shadow-md hover:translate-y-[-2px]'}
                transition-all duration-300
              `}
            >
              {/* Question button */}
              <motion.button
                className="w-full px-6 py-5 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
              >
                <h3 className="text-lg font-medium text-[#2A2A2A] pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "anticipate" }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full
                    ${openFAQ === index ? 'bg-[#8B9E90] text-white' : 'bg-[#8B9E90]/10 text-[#8B9E90]'}
                    transition-colors duration-300
                  `}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>
              
              {/* Answer content with smooth animation */}
              <AnimatePresence initial={false}>
                {openFAQ === index && (
                  <motion.div
                    key={`content-${index}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="px-6 pb-6 text-[#1A2D3A] leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <p className="text-base">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional questions prompt */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-8 rounded-xl max-w-xl mx-auto shadow-sm border border-[#C0E0EE] border-opacity-30">
            <PlusCircle size={32} className="text-[#8B9E90] mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#2A2A2A] mb-2">Have another question?</h3>
            <p className="text-[#1A2D3A] mb-6">Our sleep experts are ready to help you find your perfect rest solution.</p>
            <motion.button 
              className="px-6 py-3 bg-[#8B9E90] hover:bg-[#7b8d80] text-white rounded-full shadow-sm transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 158, 144, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection