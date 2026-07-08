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