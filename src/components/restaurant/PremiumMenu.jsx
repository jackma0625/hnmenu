import { useState, useEffect, useRef } from 'react'

export default function PremiumMenu({ restaurant, addToCart }) {
  const [activeCategory, setActiveCategory] = useState(restaurant.menu[0]?.category)
  const [addingItem, setAddingItem] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef(null)

  // 监听滚动，实现固定效果
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '-56px 0px 0px 0px',
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const filteredMenu = restaurant.menu.filter(
    (section) => section.category === activeCategory
  )

  const handleAddToCart = (item) => {
    setAddingItem(item.name)
    addToCart(item)
    setTimeout(() => setAddingItem(null), 300)
  }

  return (
    <>
      {/* 哨兵元素 */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      {/* 分类栏 - 统一样式，不依赖 theme */}
      <div
        className="premium-categories"
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: 0,
          right: 0,
          zIndex: 999,
          background: '#f5f1ea',
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '12px 16px',
          scrollbarWidth: 'none',
          borderBottom: '1px solid #eee',
          boxShadow: isSticky ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        {restaurant.menu.map((section) => (
          <button
            key={section.category}
            onClick={() => setActiveCategory(section.category)}
            style={{
              border: 'none',
              background: activeCategory === section.category ? '#000' : '#f3f3f3',
              color: activeCategory === section.category ? '#fff' : '#000',
              padding: '8px 16px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {section.category}
          </button>
        ))}
      </div>

      {/* 占位符 */}
      {isSticky && <div style={{ height: '52px' }} />}

      {/* 菜单区域 */}
      <div className="restaurant-menu">
        {filteredMenu.map((section) => (
          <div key={section.category} className="menu-section">
            <h2 style={{
              fontSize: '22px',
              marginBottom: '18px',
              color: '#8B0000',
              borderLeft: '5px solid #D4AF37',
              paddingLeft: '10px',
              fontWeight: '700',
            }}>
              {section.category}
            </h2>
            <div className="menu-items">
              {section.items.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-left">
                    <h3 style={{ fontSize: '16px', margin: 0 }}>{item.name}</h3>
                    {item.description && (
                      <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="menu-right">
                    <span style={{ fontWeight: '700', color: '#8B0000' }}>
                      L {item.price}
                    </span>
                    <button
                      className={`add-to-cart-btn ${addingItem === item.name ? 'adding' : ''}`}
                      onClick={() => handleAddToCart(item)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '999px',
                        border: 'none',
                        background: addingItem === item.name ? '#4CAF50' : '#8B0000',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                      }}
                    >
                      {addingItem === item.name ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}