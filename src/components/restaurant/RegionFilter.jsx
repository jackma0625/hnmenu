import { useState } from 'react';
import { cities } from '../../data/cities';

export default function RegionFilter({ 
  selectedCity, 
  setSelectedCity,
  showMenu,
  setShowMenu,
}) {
  const getCurrentCityName = () => {
    const city = cities.find(c => c.id === selectedCity);
    return city ? city.name : 'Todas las ciudades';
  };

  const handleSelectCity = (cityId) => {
    setSelectedCity(cityId);
    setShowMenu();
  };

  return (
    <div className="region-filter" style={{ width: '100%', position: 'relative' }}>
      <div className="region-filter-bar">
        <button 
          className="region-filter-btn"
          onClick={setShowMenu}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '8px 16px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            border: 'none',
            background: '#f5f5f5',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          📍 {getCurrentCityName()} ▼
        </button>
      </div>

      {showMenu && (
        <div
          className="region-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {cities.map(city => (
            <button
              key={city.id}
              onClick={() => handleSelectCity(city.id)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: selectedCity === city.id ? '#f5f5f5' : 'white',
                textAlign: 'left',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                fontSize: '14px',
                color: selectedCity === city.id ? '#ff9800' : '#333',
                fontWeight: selectedCity === city.id ? '600' : '400',
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