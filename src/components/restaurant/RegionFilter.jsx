import { useState } from 'react';
import { cities } from '../../data/cities'; 

export default function RegionFilter({ selectedCity, setSelectedCity }) {
  const [showMenu, setShowMenu] = useState(false);

  const getCurrentCityName = () => {
    const city = cities.find(c => c.id === selectedCity);
    return city ? city.name : 'Todas las ciudades';
  };

  return (
    <div className="region-filter">
      <div className="region-filter-bar">
        <button 
          className="region-filter-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          📍 {getCurrentCityName()} ▼
        </button>
      </div>
      
      {showMenu && (
        <div className="region-dropdown">
          {cities.map(city => (
            <button
              key={city.id}
              onClick={() => {
                setSelectedCity(city.id);
                setShowMenu(false);
              }}
              className={selectedCity === city.id ? 'active-region' : ''}
            >
              📍 {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}