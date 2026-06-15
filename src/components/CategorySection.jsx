import { useState, useEffect, useRef } from 'react'
import { categories } from '../data/categories.js'

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef(null)
  const ticking = useRef(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    // 用 IntersectionObserver，手机兼容性好，不震动
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 使用 requestAnimationFrame 防抖，避免手机震动
        if (!ticking.current) {
          requestAnimationFrame(() => {
            setIsSticky(!entry.isIntersecting)
            ticking.current = false
          })
          ticking.current = true
        }
      },
      {
        threshold: 0,
        rootMargin: '-88px 0px 0px 0px',
      }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  // 获取当前显示的分类名称
  const getCurrentCategoryName = () => {
    if (selectedCategory === 'all') return 'Todos'
    const cat = categories.find(c => c.slug === selectedCategory)
    return cat ? `${cat.icon} ${cat.name}` : 'Todos'
  }

  return (
    <>
      {/* 哨兵元素 - 放在分类栏原本位置的上方 */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      <div
        className="categories"
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '88px' : 'auto',
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'white',
          borderBottom: '1px solid #eee',
          boxShadow: isSticky ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          transition: isSticky ? 'box-shadow 0.2s' : 'none'
        }}
      >
        <div className="filter-bar" style={{ padding: '0' }}>
          <button
            className="filter-btn"
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '12px 16px'
            }}
          >
            {getCurrentCategoryName()} ▼
          </button>
        </div>

        {showMenu && (
          <div 
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              zIndex: 1000,
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <button
              className={selectedCategory === 'all' ? 'active-dropdown' : ''}
              onClick={() => {
                setSelectedCategory('all')
                setShowMenu(false)
              }}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: 'none',
                background: selectedCategory === 'all' ? '#f5f5f5' : 'white',
                textAlign: 'left',
                borderBottom: '1px solid #eee'
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
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: selectedCategory === category.slug ? '#f5f5f5' : 'white',
                  textAlign: 'left',
                  borderBottom: '1px solid #eee'
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