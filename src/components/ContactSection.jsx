import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Mail, 
  User, 
  MessageSquare, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Form status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
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
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message should be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // Success scenario (in real app, this would be an API call)
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#FDFDFC] relative overflow-hidden" id="contact-section">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-[#2A2A2A] mb-4"
              variants={itemVariants}
            >
              Get in <span className="text-[#8B9E90]">Touch</span>
            </motion.h2>
            <motion.p 
              className="text-[#1A2D3A] max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Have questions about our sleep earbuds? We're here to help you find your perfect sound of silence.
            </motion.p>
          </motion.div>
          
          {/* Contact Form and Info Container */}
          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Form */}
            <motion.div 
              className="md:col-span-3 bg-white rounded-xl shadow-sm border border-[#8B9E90]/10 p-6 md:p-8"
              variants={itemVariants}
            >
              {isSubmitted ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-full py-10 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle size={60} className="text-[#8B9E90] mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-[#2A2A2A] mb-2">Message Sent!</h3>
                  <p className="text-[#1A2D3A]/70">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-[#8B9E90]/60" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8F8F4] border ${
                            formErrors.name ? 'border-red-300' : 'border-[#8B9E90]/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9E90]/30 transition-all duration-200`}
                          placeholder="Your name"
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-[#8B9E90]/60" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8F8F4] border ${
                            formErrors.email ? 'border-red-300' : 'border-[#8B9E90]/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9E90]/30 transition-all duration-200`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    
                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#2A2A2A] mb-1.5">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare size={18} className="text-[#8B9E90]/60" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8F8F4] border ${
                            formErrors.message ? 'border-red-300' : 'border-[#8B9E90]/20'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9E90]/30 transition-all duration-200`}
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                      {formErrors.message && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 mt-2 rounded-full text-white bg-[#8B9E90] hover:bg-[#7A8C7E] transition-all duration-300 disabled:opacity-70"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div 
                          className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="md:col-span-2"
              variants={itemVariants}
            >
              <div className="bg-[#F8F8F4] rounded-xl p-6 md:p-8 h-full">
                <h3 className="text-xl font-light text-[#2A2A2A] mb-6 border-b border-[#8B9E90]/20 pb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[#8B9E90] font-medium mb-1">Email</h4>
                    <p className="text-[#1A2D3A]">support@zensleep.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[#8B9E90] font-medium mb-1">Phone</h4>
                    <p className="text-[#1A2D3A]">+1 (800) 555-1234</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[#8B9E90] font-medium mb-1">Office Hours</h4>
                    <p className="text-[#1A2D3A]">Monday - Friday: 9AM - 5PM EST</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-[#8B9E90] font-medium mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#8B9E90]/10"
                      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5 text-[#8B9E90]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 5.8C21.3 6.1 20.6 6.3 19.9 6.4C20.7 5.9 21.2 5.2 21.5 4.3C20.8 4.7 20 5 19.2 5.2C18.5 4.4 17.5 4 16.4 4C14.3 4 12.7 5.6 12.7 7.7C12.7 8 12.7 8.3 12.8 8.5C9.7 8.4 7 7 5.1 4.8C4.8 5.3 4.7 5.9 4.7 6.5C4.7 7.6 5.2 8.5 6.1 9.1C5.5 9.1 4.9 8.9 4.4 8.7V8.7C4.4 10.6 5.6 12.1 7.2 12.4C6.9 12.5 6.6 12.5 6.3 12.5C6.1 12.5 5.9 12.5 5.7 12.4C6.1 13.9 7.4 14.9 9 15C7.8 16 6.2 16.5 4.6 16.5C4.3 16.5 4.1 16.5 3.8 16.4C5.4 17.4 7.3 18 9.3 18C16.4 18 20.2 12.5 20.2 7.7C20.2 7.6 20.2 7.4 20.2 7.3C20.9 6.8 21.5 6.2 22 5.8Z" fill="currentColor"/>
                      </svg>
                    </motion.a>
                    
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#8B9E90]/10"
                      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 text-[#8B9E90]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3C14.7 3 15 3 16.1 3.1C17.1 3.1 17.8 3.3 18.3 3.5C18.9 3.7 19.3 4 19.7 4.4C20.1 4.8 20.3 5.2 20.5 5.8C20.7 6.3 20.9 7 20.9 8C21 9.1 21 9.4 21 12.1C21 14.8 21 15.1 20.9 16.2C20.9 17.2 20.7 17.9 20.5 18.4C20.3 19 20 19.4 19.6 19.8C19.2 20.2 18.8 20.4 18.2 20.6C17.7 20.8 17 21 16 21C14.9 21.1 14.6 21.1 11.9 21.1C9.2 21.1 8.9 21.1 7.8 21C6.8 21 6.1 20.8 5.6 20.6C5 20.4 4.6 20.1 4.2 19.7C3.8 19.3 3.6 18.9 3.4 18.3C3.2 17.8 3 17.1 3 16.1C2.9 15 2.9 14.7 2.9 12C2.9 9.3 2.9 9 3 7.9C3 6.9 3.2 6.2 3.4 5.7C3.6 5.1 3.9 4.7 4.3 4.3C4.7 3.9 5.1 3.7 5.7 3.5C6.2 3.3 6.9 3.1 7.9 3.1C9 3 9.3 3 12 3ZM12 5C9.3 5 9.1 5 8 5.1C7.1 5.1 6.6 5.3 6.3 5.4C5.9 5.5 5.6 5.7 5.3 6C5 6.3 4.8 6.6 4.7 7C4.6 7.3 4.4 7.8 4.4 8.7C4.3 9.8 4.3 10 4.3 12.7C4.3 15.4 4.3 15.6 4.4 16.7C4.4 17.6 4.6 18.1 4.7 18.4C4.8 18.8 5 19.1 5.3 19.4C5.6 19.7 5.9 19.9 6.3 20C6.6 20.1 7.1 20.3 8 20.3C9.1 20.4 9.3 20.4 12 20.4C14.7 20.4 14.9 20.4 16 20.3C16.9 20.3 17.4 20.1 17.7 20C18.1 19.9 18.4 19.7 18.7 19.4C19 19.1 19.2 18.8 19.3 18.4C19.4 18.1 19.6 17.6 19.6 16.7C19.7 15.6 19.7 15.4 19.7 12.7C19.7 10 19.7 9.8 19.6 8.7C19.6 7.8 19.4 7.3 19.3 7C19.2 6.6 19 6.3 18.7 6C18.4 5.7 18.1 5.5 17.7 5.4C17.4 5.3 16.9 5.1 16 5.1C14.9 5 14.7 5 12 5Z" fill="currentColor"/>
                        <path d="M12 7.4C14.8 7.4 17.1 9.7 17.1 12.5C17.1 15.3 14.8 17.6 12 17.6C9.2 17.6 6.9 15.3 6.9 12.5C6.9 9.7 9.2 7.4 12 7.4ZM12 15.6C13.7 15.6 15.1 14.2 15.1 12.5C15.1 10.8 13.7 9.4 12 9.4C10.3 9.4 8.9 10.8 8.9 12.5C8.9 14.2 10.3 15.6 12 15.6Z" fill="currentColor"/>
                        <path d="M17.3 8.5C18 8.5 18.5 7.9 18.5 7.3C18.5 6.6 18 6.1 17.3 6.1C16.6 6.1 16.1 6.6 16.1 7.3C16.1 7.9 16.6 8.5 17.3 8.5Z" fill="currentColor"/>
                      </svg>
                    </motion.a>
                    
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#8B9E90]/10"
                      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5 text-[#8B9E90]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 16.9 5.4 20.9 10 21.8V15H8V12H10V9.5C10 7.6 11.6 6 13.5 6H16V9H14C13.4 9 13 9.4 13 10V12H16V15H13V21.9C18 21.4 22 17.1 22 12Z" fill="currentColor"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Newsletter Signup */}
          <motion.div 
            className="mt-16 p-8 bg-gradient-to-r from-[#D4BE98]/30 to-[#8B9E90]/30 rounded-xl relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#D4BE98] blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#8B9E90] blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                <h3 className="text-xl text-[#2A2A2A] font-light mb-2">
                  Subscribe to our newsletter
                </h3>
                <p className="text-[#1A2D3A]/70 text-sm">
                  Stay updated with our latest products and sleep technology innovations.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-full border border-[#8B9E90]/20 focus:outline-none focus:ring-2 focus:ring-[#8B9E90]/30 transition-all duration-200 w-full"
                  />
                  <motion.button
                    className="px-6 py-3 rounded-full bg-[#8B9E90] text-white font-light whitespace-nowrap"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;