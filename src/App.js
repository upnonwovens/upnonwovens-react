import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './tabs/Home';
import About from './tabs/About';
import Products from './tabs/Products';
import Contact from './tabs/Contact';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
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
      {/* Home Module */}
      <section id="home" ref={sectionRefs.home}>
        <Home />
      </section>

      {/* About Us Module (Moved Up) */}
      <section id="about" ref={sectionRefs.about} style={{ paddingTop: '40px' }}>
        <About />
      </section>

      {/* Products Module (Moved Down) */}
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