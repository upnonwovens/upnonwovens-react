import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './tabs/Home';
import About from './tabs/About';
import Technology from './tabs/Technology';
import Tools from './tabs/Tools';
import Products from './tabs/Products';
import Simulation from './tabs/Simulation';
import Contact from './tabs/Contact';
import PrivacyPolicy from './tabs/PrivacyPolicy';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [viewMode, setViewMode] = useState('main');

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    technology: useRef(null),
    tools: useRef(null),
    simulation: useRef(null),
    products: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    // Check if the user navigated to the hard URL /privacy-policy
    if (window.location.pathname === '/privacy-policy') {
      setViewMode('privacy');
      setCurrentTab('privacy');
    } else if (window.location.hash) {
      // Handle hash routing if they navigated back to the main site from the privacy page
      const targetTab = window.location.hash.replace('#', '');
      if (sectionRefs[targetTab]) {
        setTimeout(() => {
          const targetRef = sectionRefs[targetTab].current;
          if (targetRef) {
            const headerOffset = 90;
            const elementPosition = targetRef.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, []);

  const handleTabClick = (tabId) => {
    if (tabId === 'privacy') {
      window.location.href = '/privacy-policy';
      return;
    }

    if (window.location.pathname === '/privacy-policy') {
      // If the user is reading the privacy page and clicks a top nav link (like "About Us"), 
      // we redirect them back to the root domain and attach the section hash.
      window.location.href = `/#${tabId}`;
      return;
    }

    // Standard smooth scrolling behavior for the main single-page layout
    setCurrentTab(tabId);
    window.location.hash = tabId;
    const targetRef = sectionRefs[tabId]?.current;
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
    if (viewMode === 'privacy') return;

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
  }, [viewMode]);

  return (
    <Layout currentTab={currentTab} onTabClick={handleTabClick}>
      
      {viewMode === 'privacy' ? (
        /* ISOLATED PRIVACY POLICY VIEW */
        <div style={{ paddingTop: '20px', minHeight: '70vh' }}>
          <PrivacyPolicy />
        </div>
      ) : (
        /* MAIN SINGLE-PAGE SCROLLING LAYOUT */
        <>
          <section id="home" ref={sectionRefs.home}>
            <Home />
          </section>

          <section id="about" ref={sectionRefs.about} style={{ paddingTop: '40px' }}>
            <About />
          </section>

          <section id="technology" ref={sectionRefs.technology} style={{ paddingTop: '40px' }}>
            <Technology />
          </section>

          <section id="tools" ref={sectionRefs.tools} style={{ paddingTop: '40px' }}>
            <Tools />
          </section>

          <section id="simulation" ref={sectionRefs.simulation} style={{ paddingTop: '40px' }}>
            <Simulation />
          </section>

          <section id="products" ref={sectionRefs.products} style={{ paddingTop: '40px' }}>
            <Products />
          </section>

          <section id="contact" ref={sectionRefs.contact} style={{ paddingTop: '40px' }}>
            <Contact />
          </section>
        </>
      )}
    </Layout>
  );
}

export default App;