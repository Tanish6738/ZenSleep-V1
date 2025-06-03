import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Headphones,
  ChevronDown,
} from "lucide-react";

// Common header height constant for consistent offset calculations
const HEADER_HEIGHT = 80;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const throttleRef = useRef(null);

  // Advanced scroll animations
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const navBlur = useTransform(scrollY, [0, 50], [0, 6]);

  // Throttle function for better performance
  const throttle = (callback, delay) => {
    if (throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      callback();
      throttleRef.current = null;
    }, delay);
  };

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      throttle(() => {
        // Update navbar style on scroll
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }        // Check which section is currently in view
        const sections = [
          { id: "hero-section", title: "Home" },
          { id: "product-section", title: "Features" },
          { id: "how-it-works-section", title: "How It Works" },
          { id: "testimonials-section", title: "Testimonials" },
          { id: "compare-section", title: "Compare" },
          { id: "pricing-section", title: "Pricing" },
          { id: "faq-section", title: "FAQ" },
          { id: "contact-section", title: "Contact" },
        ];

        // Find current section
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section.id);
          if (!element) return false;

          const rect = element.getBoundingClientRect();
          // Consider a section in view if its top is near the top of the viewport
          // and adjust for fixed header
          return rect.top <= HEADER_HEIGHT + 70 && rect.bottom > HEADER_HEIGHT;
        });

        if (currentSection) {
          setActiveLink(currentSection.title);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);  // Navigation links with updated href values to match section IDs
  const navLinks = [
    { title: "Home", href: "#hero-section" },
    { title: "Features", href: "#product-section" },
    { title: "How It Works", href: "#how-it-works-section" },
    { title: "Testimonials", href: "#testimonials-section" },
    { title: "Compare", href: "#compare-section" },
    { title: "Pricing", href: "#pricing-section" },
    { title: "FAQ", href: "#faq-section" },
    { title: "Contact", href: "#contact-section" },
  ];

  // Handle link click with smooth scrolling
  const handleLinkClick = (title, href, e) => {
    e.preventDefault();
    setActiveLink(title);
    setIsMenuOpen(false);

    // Get the target element
    const targetId = href.substring(1); // Remove the # from the href
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Account for fixed header offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;

      // Smooth scroll to the target
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without causing a jump
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-sm py-2 shadow-sm" : "py-5"
      }`}
      style={{
        backgroundColor: isScrolled
          ? "rgba(248, 248, 244, 0.85)"
          : "transparent",
        color: "var(--text-primary)",
        backdropFilter: `blur(${navBlur.get()}px)`,
        opacity: navOpacity,
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={(e) => handleLinkClick("Home", "#hero-section", e)}
          >
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <Headphones
                size={24}
                style={{ color: "var(--accent-1)" }}
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.span
              className="text-2xl font-extralight tracking-widest"
              style={{ color: "var(--accent-1)" }}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              ZenSleep
            </motion.span>
          </motion.div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`text-sm font-light tracking-wide relative px-1 py-2 overflow-hidden group ${
                  activeLink === link.title ? "font-normal" : ""
                }`}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => handleLinkClick(link.title, link.href, e)}
                aria-current={activeLink === link.title ? "page" : undefined}
              >
                {link.title}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeLink === link.title ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform origin-left group-hover:scale-x-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "var(--accent-1)" }}
                />
              </motion.a>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full relative overflow-hidden group"
              aria-label="User account"
            >
              <User size={20} strokeWidth={1.5} />
              <motion.span
                className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transform scale-0 group-hover:scale-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full relative overflow-hidden"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--primary-bg)",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              <span className="text-sm font-light tracking-wide">Cart</span>
              <motion.span
                className="absolute inset-0 bg-black opacity-0 hover:opacity-5"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "rgba(139, 158, 144, 0.1)" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "var(--primary-bg-alt)" }}
          >
            <motion.div
              className="container mx-auto px-4 py-5 flex flex-col space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              role="menu"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  role="menuitem"
                  className={`text-base py-3 border-b flex items-center justify-between ${
                    activeLink === link.title ? "font-normal" : "font-light"
                  }`}
                  style={{
                    borderColor: "rgba(139, 158, 144, 0.15)",
                    color:
                      activeLink === link.title
                        ? "var(--accent-1)"
                        : "var(--text-primary)",
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.07 }}
                  onClick={(e) => handleLinkClick(link.title, link.href, e)}
                  aria-current={activeLink === link.title ? "page" : undefined}
                >
                  {link.title}
                  <motion.div
                    animate={{
                      x: activeLink === link.title ? [0, 4, 0] : 0,
                      opacity: activeLink === link.title ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={activeLink === link.title ? "rotate-180" : ""}
                      style={{
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </motion.div>
                </motion.a>
              ))}

              <div className="flex items-center justify-between pt-5 mt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full border"
                  style={{ borderColor: "rgba(139, 158, 144, 0.3)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  aria-label="User account"
                  role="menuitem"
                >
                  <User size={18} strokeWidth={1.5} />
                  <span className="text-sm font-light tracking-wide">
                    Account
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-1)",
                    color: "var(--primary-bg)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  aria-label="Shopping cart"
                  role="menuitem"
                >
                  <ShoppingCart size={18} strokeWidth={1.5} />
                  <span className="text-sm font-light tracking-wide">Cart</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
