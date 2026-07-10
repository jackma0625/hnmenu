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
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '8px 16px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
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
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: selectedCity === city.id ? '#f5f5f5' : 'white',
                textAlign: 'left',
                borderBottom: '1px solid #eee',
              }}
            >
              📍 {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}