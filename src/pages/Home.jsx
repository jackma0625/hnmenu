import { filterRestaurants } from '../utils/filterRestaurants';
import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(20); // 每次加载20家
  const sentinelRef = useRef(null);
  const ticking = useRef(false);
  const loaderRef = useRef(null);

  // 滚动固定逻辑
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

  // 按城市和分类筛选
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

  // 当前显示的数量
  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRestaurants.length;

  // 无限滚动 - 用 IntersectionObserver 检测底部
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount(prev => Math.min(prev + 20, filteredRestaurants.length));
        }
      },
      {
        rootMargin: '0px 0px 200px 0px', // 提前200px触发加载
        threshold: 0.1,
      }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, filteredRestaurants.length]);

  // 当筛选条件变化时，重置显示数量
  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCity, selectedCategory]);

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
            {visibleRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>

          {/* 加载更多触发器和加载状态 */}
          <div ref={loaderRef} className="loader-container">
            {hasMore && (
              <div className="loader-spinner">
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-text">Cargando más restaurantes...</span>
              </div>
            )}
            {!hasMore && filteredRestaurants.length > 0 && (
              <div className="loader-end">
                <span>🎉 ¡Has visto todos los restaurantes!</span>
              </div>
            )}
            {filteredRestaurants.length === 0 && (
              <div className="loader-empty">
                <span>😅 No hay restaurantes en esta categoría</span>
              </div>
            )}
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
            </div>

            <div className="footer-info">
              <h4>¿Tu restaurante no está aquí?</h4>
              <p>Contáctanos para agregarlo gratis</p>
              <Link to="/pricing" className="footer-pricing-link">
                📊 Ver todos los planes →
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