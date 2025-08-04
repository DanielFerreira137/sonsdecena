import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TheatreCurtainPreloader from './components/TheatreCurtainPreloader';
import Header from './components/Header';
import Hero from './components/Hero';

import ArtistsList from './components/ArtistsList';
import ArtistDetail from './components/ArtistDetail';
import EventsPage from './components/EventsPage';
import Footer from './components/Footer';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

// Home page component
const HomePage: React.FC = () => {
  return <Hero />;
};

// Artists page component
const ArtistsPage: React.FC = () => {
  return <ArtistsList />;
};

// Events page component
const EventsPageComponent: React.FC = () => {
  return <EventsPage />;
};

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Check if we're navigating to an anchor link
  const isAnchorNavigation = () => {
    const hash = window.location.hash;
    return hash === '#about' || hash === '#contact' || hash === '#singers';
  };

  // Handle anchor links and smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about' || hash === '#contact' || hash === '#singers') {
        setTimeout(() => {
          const section = document.getElementById(hash.substring(1));
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial load with hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fetch singers data
  const fetchSingers = async () => {
    try {
      const singersCollection = collection(firestore, 'singers');
      const singersSnapshot = await getDocs(singersCollection);
      const singersList = singersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Singers fetched:', singersList);
    } catch (error: any) {
      console.error('Error fetching singers:', error);
    }
  };

  useEffect(() => {
    fetchSingers();
  }, []);

  return (
    <Router>
      <div className="App">
        {showPreloader && !isAnchorNavigation() && (
          <TheatreCurtainPreloader
            onComplete={handlePreloaderComplete}
            duration={3000}
          />
        )}
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/events" element={<EventsPageComponent />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
