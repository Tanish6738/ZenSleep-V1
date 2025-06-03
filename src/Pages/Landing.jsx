import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import HowItWork from "../components/HowItWork";
import ProductSection from "../components/ProductSection";
import Testimonial from "../components/Testimonial";
import CompareSection from "../components/CompareSection";
import PriceSection from "../components/PriceSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToSection from "../components/utils/ScrollToSection";
import { FadeIn } from "../components/utils/ScrollReveal";

// Common header height constant for consistent offset calculations
const HEADER_HEIGHT = 80;

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add section IDs and set up scroll behavior
  useEffect(() => {
    // Define section IDs for navigation
    const sectionIds = [
      { element: "hero", id: "hero-section" },
      { element: "product", id: "product-section" },
      { element: "how-it-works", id: "how-it-works-section" },
      { element: "testimonials", id: "testimonials-section" },
      { element: "compare", id: "compare-section" },
      { element: "pricing", id: "pricing-section" },
      { element: "faq", id: "faq-section" },
      { element: "contact", id: "contact-section" },
      { element: "footer", id: "footer" },
    ];

    // Add IDs to sections for scroll navigation
    sectionIds.forEach(({ element, id }) => {
      const sectionElement =
        document.querySelector(`section.${element}-section`) ||
        document.getElementById(element);
      if (sectionElement && !sectionElement.id) {
        sectionElement.id = id;
      }
    });

    // Handle initial navigation if URL has a hash
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Use requestAnimationFrame to ensure DOM is fully ready
        requestAnimationFrame(() => {
          // Offset for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - HEADER_HEIGHT;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }

    // Set scroll-padding-top on html element for native scroll behavior
    document.documentElement.style.setProperty(
      "--scroll-padding-top",
      `${HEADER_HEIGHT}px`
    );
    document.documentElement.style.scrollPaddingTop = `${HEADER_HEIGHT}px`;
  }, []);

  // Navigation sections for ScrollToSection component
  const navigationSections = [
    { id: "hero-section", label: "Home" },
    { id: "product-section", label: "Features" },
    { id: "how-it-works-section", label: "How It Works" },
    { id: "testimonials-section", label: "Testimonials" },
    { id: "compare-section", label: "Compare" },
    { id: "pricing-section", label: "Pricing" },
    { id: "faq-section", label: "FAQ" },
    { id: "contact-section", label: "Contact" },
    { id: "footer", label: "Footer" },
  ];

  return (
    <>
      <FadeIn>
        <Navbar />
      </FadeIn>

      {/* Main page content */}
      <main className="landing-page">
        <HeroSection />
        <ProductSection />
        <HowItWork /> <Testimonial />
        <CompareSection />
        <PriceSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Floating navigation */}
      <ScrollToSection
        sections={navigationSections}
        position={isMobile ? "right" : "right"}
        offset={isMobile ? 15 : 30}
        showLabels={false}
        showIcons={true}
        activeClass="text-[var(--accent-1)] scale-125"
        itemClassName={
          isMobile
            ? "w-3 h-3 rounded-full bg-gray-200 hover:bg-[var(--accent-1-alt)]"
            : "w-4 h-4 rounded-full bg-gray-200 hover:bg-[var(--accent-1-alt)]"
        }
        containerClassName={
          isMobile
            ? "py-2 px-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md"
            : "py-3 px-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
        }
        alwaysVisible={false} 
        fadeIn={true}
        highlightActive={true}
      />
    </>
  );
};

export default Landing;
