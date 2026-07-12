import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './tabs/Home';
import About from './tabs/About';
import Technology from './tabs/Technology';
import Products from './tabs/Products';
import Simulation from './tabs/Simulation';
import Contact from './tabs/Contact';

function App() {
  const [currentTab, setCurrentTab] = useState('about');

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    technology: useRef(null),
    simulation: useRef(null),
    products: useRef(null),
    contact: useRef(null)
  };

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
    
    const targetRef = sectionRefs[tabId].current;
    if (targetRef) {
      const headerOffset = 90;
      const elementPosition = targetRef.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
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
      {/* Home Module (Hero Carousel Only) */}
      <section id="home" ref={sectionRefs.home}>
        <Home />
      </section>

      {/* About Us Module */}
      <section id="about" ref={sectionRefs.about} style={{ paddingTop: '40px' }}>
        <About />
      </section>

      {/* Technology Module */}
      <section id="technology" ref={sectionRefs.technology} style={{ paddingTop: '40px' }}>
        <Technology />
      </section>

      {/* Simulation Module - Moved Before Products */}
      <section id="simulation" ref={sectionRefs.simulation} style={{ paddingTop: '40px' }}>
        <Simulation />
      </section>

      {/* Products Module */}
      <section id="products" ref={sectionRefs.products} style={{ paddingTop: '40px' }}>
        <Products />
      </section>

      {/* Contact Us Module */}
      <section id="contact" ref={sectionRefs.contact} style={{ paddingTop: '40px' }}>
        <Contact />
      </section>
    </Layout>
  );
}

export default App;