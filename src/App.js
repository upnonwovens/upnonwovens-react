import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './tabs/Home';
import Products from './tabs/Products';
import About from './tabs/About';
import Contact from './tabs/Contact';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  // References to track the location of each section on the continuous page
  const sectionRefs = {
    home: useRef(null),
    products: useRef(null),
    about: useRef(null),
    contact: useRef(null)
  };

  // Click handler to execute a smooth scroll jump to the targeted element coordinate
  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
    
    const targetRef = sectionRefs[tabId].current;
    if (targetRef) {
      // Calculate offset for sticky header height clearance
      const headerOffset = 90;
      const elementPosition = targetRef.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Intersection Observer setup to automatically switch active header states during scrolling
  useEffect(() => {
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '-40% 0px -50% 0px', // triggers when section occupies the active view zone
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Attach observer to each layout module section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <Layout currentTab={currentTab} onTabClick={handleTabClick}>
      {/* Home Module */}
      <section id="home" ref={sectionRefs.home}>
        <Home />
      </section>

      {/* Products Module */}
      <section id="products" ref={sectionRefs.products} style={{ paddingTop: '40px' }}>
        <Products />
      </section>

      {/* About Us Module */}
      <section id="about" ref={sectionRefs.about} style={{ paddingTop: '40px' }}>
        <About />
      </section>

      {/* Contact Us Module */}
      <section id="contact" ref={sectionRefs.contact} style={{ paddingTop: '40px' }}>
        <Contact />
      </section>
    </Layout>
  );
}

export default App;