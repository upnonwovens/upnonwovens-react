// src/App.js
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
import AdminPortal from './tabs/AdminPortal';

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
    // Check direct path routing
    if (window.location.pathname === '/privacy-policy') {
      setViewMode('privacy');
      setCurrentTab('privacy');
    } else if (window.location.pathname === '/admin-portal') {
      setViewMode('admin');
      setCurrentTab('admin');
    } else if (window.location.hash) {
      // Handle hash routing back to the single-page layout
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

    if (tabId === 'admin') {
      window.location.href = '/admin-portal';
      return;
    }

    if (window.location.pathname === '/privacy-policy' || window.location.pathname === '/admin-portal') {
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
    if (viewMode === 'privacy' || viewMode === 'admin') return;

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
      ) : viewMode === 'admin' ? (
        /* ISOLATED ADMIN PORTAL VIEW */
        <div style={{ paddingTop: '20px', minHeight: '70vh' }}>
          <AdminPortal />
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