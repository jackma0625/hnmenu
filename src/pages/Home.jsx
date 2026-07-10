import { filterRestaurants } from '../utils/filterRestaurants';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegionFilter from '../components/restaurant/RegionFilter';
import CategorySection from '../components/CategorySection';
import Navbar from '../components/restaurant/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import '../styles/Home.css';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSticky, setIsSticky] = useState(false);
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const sentinelRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!ticking.current) {
          requestAnimationFrame(() => {
            setIsSticky(!entry.isIntersecting);
            ticking.current = false;
          });
          ticking.current = true;
        }
      },
      {
        threshold: 0,
        rootMargin: '-88px 0px 0px 0px',
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const filteredByCity =
    selectedCity === 'all'
      ? restaurants
      : restaurants.filter(
          restaurant => restaurant.city === selectedCity
        );

  const filteredRestaurants = filterRestaurants(
    filteredByCity,
    selectedCategory
  );

  const toggleCityMenu = () => {
    setShowCityMenu(!showCityMenu);
    if (!showCityMenu) {
      setShowCategoryMenu(false);
    }
  };

  const toggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
    if (!showCategoryMenu) {
      setShowCityMenu(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="main-content">
        <div ref={sentinelRef} style={{ height: '1px' }} />

        <div
          className="filter-row"
          style={{
            position: isSticky ? 'fixed' : 'relative',
            top: isSticky ? '88px' : 'auto',
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'white',
            boxShadow: isSticky ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
            transition: 'box-shadow 0.2s',
            display: 'flex',
            gap: '12px',
            padding: '8px 16px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '52px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <RegionFilter
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              showMenu={showCityMenu}
              setShowMenu={toggleCityMenu}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <CategorySection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showMenu={showCategoryMenu}
              setShowMenu={toggleCategoryMenu}
            />
          </div>
        </div>

        {isSticky && <div style={{ height: '52px' }} />}

        <section className="restaurants">
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </section>

        {/* ====== 页脚 ====== */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🍽️ HNMenu</h3>
              <p>Menús digitales para restaurantes en Honduras</p>
            </div>

            <div className="footer-contact">
              <h4>Contacto</h4>
              <a 
                href="https://wa.me/504XXXXXXXX" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp"
              >
                📱 WhatsApp
              </a>
              <a 
                href="mailto:tuemail@example.com"
                className="footer-email"
              >
                ✉️ tuemail@example.com
              </a>
            </div>

            <div className="footer-info">
              <h4>¿Tu restaurante no está aquí?</h4>
              <p>Contáctanos para agregarlo gratis</p>
              <Link to="/pricing" className="footer-pricing-link">
                📊 Ver todos los planes
              </Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} HNMenu - Hecho en 🇭🇳 Honduras</p>
          </div>
        </footer>
      </div>
    </>
  );
}