import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './tabs/Home';
import Products from './tabs/Products';
import About from './tabs/About';
import Contact from './tabs/Contact';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  // Simple clean hash router handling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'products', 'about', 'contact'].includes(hash)) {
        setCurrentTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial setup mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'products': return <Products />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <Layout>
      {renderTabContent()}
    </Layout>
  );
}

export default App;