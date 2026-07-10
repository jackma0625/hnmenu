import { filterRestaurants } from '../utils/filterRestaurants';
import { useState, useRef, useEffect } from 'react';
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
  const sentinelRef = useRef(null);
  const ticking = useRef(false);

  // 监听滚动，控制整个 filter-row 固定
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

  // 按城市筛选
  const filteredByCity =
    selectedCity === 'all'
      ? restaurants
      : restaurants.filter(
          restaurant => restaurant.city === selectedCity
        );

  // 按分类筛选
  const filteredRestaurants = filterRestaurants(
    filteredByCity,
    selectedCategory
  );

  return (
    <>
      <Navbar />

      <div className="main-content">
        {/* 哨兵元素 */}
        <div ref={sentinelRef} style={{ height: '1px' }} />

        {/* 整个筛选行作为一个整体固定 */}
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
          <RegionFilter
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />

          <CategorySection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* 占位符 - 防止内容跳动 */}
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
      </div>
    </>
  );
}