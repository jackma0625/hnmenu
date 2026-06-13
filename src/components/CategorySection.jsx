import { useState, useEffect, useRef } from 'react'
import { categories } from '../data/categories.js'

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const sectionRef = useRef(null)
  const placeholderRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // 当分类栏顶部到达 navbar 底部（88px）时，变成固定
        setIsSticky(rect.top <= 88)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始化检查
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* 占位符：当分类栏固定时，保持高度防止跳动 */}
      <div ref={placeholderRef} style={{ display: isSticky ? 'block' : 'none', height: '60px' }} />
      
      <div 
        ref={sectionRef}
        className={`categories ${isSticky ? 'sticky-fixed' : ''}`}
        style={isSticky ? {
          position: 'fixed',
          top: '88px',
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        } : {}}
      >
        <div className="filter-bar">
          <button
            className="filter-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            {selectedCategory === 'all'
              ? 'Todos'
              : categories.find(
                  (category) => category.slug === selectedCategory
                )?.name
            } ▼
          </button>
        </div>

        {showMenu && (
          <div className="dropdown-menu">
            <button
              className={selectedCategory === 'all' ? 'active-dropdown' : ''}
              onClick={() => {
                setSelectedCategory('all')
                setShowMenu(false)
              }}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={selectedCategory === category.slug ? 'active-dropdown' : ''}
                onClick={() => {
                  setSelectedCategory(category.slug)
                  setShowMenu(false)
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}