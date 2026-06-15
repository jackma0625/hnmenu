import { filterRestaurants } from '../utils/filterRestaurants';
import { useState } from 'react';
import RegionFilter from '../components/restaurant/RegionFilter';
import CategorySection from '../components/CategorySection';
import Navbar from '../components/restaurant/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import '../styles/Home.css';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 先按城市筛选
  const filterByCity = (restaurant) => {
    if (selectedCity === 'all') return true;
    
    const cityMap = {
      'la-entrada': 'La Entrada',
      'santa-rosa': 'Santa Rosa',
      'copan-ruinas': 'Copán Ruinas',
    };
    
    return restaurant.location?.includes(cityMap[selectedCity]);
  };
  
  const filteredByCity = restaurants.filter(filterByCity);
  const filteredRestaurants = filterRestaurants(filteredByCity, selectedCategory);
  
  return (
    <>
      <Navbar />
      
      <div className="main-content">
        {/* 同一行：地区筛选 + 分类筛选 */}
        <div className="filter-row">
          <RegionFilter
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          
          <CategorySection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

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