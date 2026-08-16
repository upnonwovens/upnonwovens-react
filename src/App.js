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
  const [viewMode, setViewMode] = useState('main'); // Tracks whether to show the single-page layout or the isolated privacy page

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    technology: useRef(null),
    tools: useRef(null),
    simulation: useRef(null),
    products: useRef(null),
    contact: useRef(null)
  };

  // Initial load check for direct privacy policy links (e.g. upnonwovens.in/#privacy)
  useEffect(() => {
    if (window.location.hash === '#privacy') {
      setViewMode('privacy');
      setCurrentTab('privacy');
    }
  }, []);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
    
    // If user clicked Privacy Policy, switch to the isolated view and scroll to top
    if (tabId === 'privacy') {
      setViewMode('privacy');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // If user is ON the privacy page and clicks a normal nav link, restore the main view first
    if (viewMode === 'privacy') {
      setViewMode('main');
      
      // Wait a fraction of a second for React to render the main DOM sections before scrolling
      setTimeout(() => {
        const targetRef = sectionRefs[tabId]?.current;
        if (targetRef) {
          const headerOffset = 90;
          const elementPosition = targetRef.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Standard smooth scrolling behavior for the main single-page layout
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
    // Disable the scroll observer if we are on the isolated privacy page
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
  }, [viewMode]); // Re-initialize the observer when viewMode switches back to 'main'

  return (
    <Layout currentTab={currentTab} onTabClick={handleTabClick}>
      
      {viewMode === 'privacy' ? (
        
        /* --------------------------------------------------------- */
        /* ISOLATED PRIVACY POLICY VIEW                              */
        /* --------------------------------------------------------- */
        <div style={{ paddingTop: '20px', minHeight: '70vh' }}>
          <PrivacyPolicy />
        </div>

      ) : (
        
        /* --------------------------------------------------------- */
        /* MAIN SINGLE-PAGE SCROLLING LAYOUT                         */
        /* --------------------------------------------------------- */
        <>
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

          {/* Standalone Tools & Calculators Module */}
          <section id="tools" ref={sectionRefs.tools} style={{ paddingTop: '40px' }}>
            <Tools />
          </section>

          {/* Simulation Module */}
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
        </>
      )}

    </Layout>
  );
}

export default App;