
import { useState, useEffect, useRef } from 'react';
import { categories } from '../data/categories.js';

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
  showMenu,
  setShowMenu,
}) {
  // 删除 isSticky 和 sentinelRef 相关代码
  // 因为固定逻辑由 Home.jsx 统一控制

  const getCurrentCategoryName = () => {
    if (selectedCategory === 'all') return 'Todos';
    const cat = categories.find(c => c.slug === selectedCategory);
    return cat ? `${cat.icon} ${cat.name}` : 'Todos';
  };

  const handleSelectCategory = (slug) => {
    setSelectedCategory(slug);
    setShowMenu();
  };

  return (
    <div
      className="categories"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        boxSizing: 'border-box',
        width: '100%',
        
      }}
    >
      <div className="filter-bar" style={{ 
        padding: '0', 
        width: '100%', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}>
        <button
          className="filter-btn"
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
          🍽️ {getCurrentCategoryName()} ▼
        </button>

        {showMenu && (
          <div
            className="dropdown-menu"
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
            <button
              onClick={() => handleSelectCategory('all')}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: selectedCategory === 'all' ? '#f5f5f5' : 'white',
                textAlign: 'left',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                fontSize: '14px',
                color: selectedCategory === 'all' ? '#ff9800' : '#333',
                fontWeight: selectedCategory === 'all' ? '600' : '400',
              }}
            >
              🍽️ Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(category.slug)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: selectedCategory === category.slug ? '#f5f5f5' : 'white',
                  textAlign: 'left',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: selectedCategory === category.slug ? '#ff9800' : '#333',
                  fontWeight: selectedCategory === category.slug ? '600' : '400',
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}