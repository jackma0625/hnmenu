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
  const [showCityMenu, setShowCityMenu] = useState(false);  // 城市下拉开关
  const [showCategoryMenu, setShowCategoryMenu] = useState(false); // 分类下拉开关
  const sentinelRef = useRef(null);
  const ticking = useRef(false);

  // 监听滚动
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

  // 切换城市菜单
  const toggleCityMenu = () => {
    setShowCityMenu(!showCityMenu);
    if (!showCityMenu) {
      setShowCategoryMenu(false); // 打开城市时关闭分类
    }
  };

  // 切换分类菜单
  const toggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
    if (!showCategoryMenu) {
      setShowCityMenu(false); // 打开分类时关闭城市
    }
  };

  return (
    <>
      <Navbar />

      <div className="main-content">
        {/* 哨兵元素 */}
        <div ref={sentinelRef} style={{ height: '1px' }} />

        {/* 整个筛选行 */}
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

        {/* 占位符 */}
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