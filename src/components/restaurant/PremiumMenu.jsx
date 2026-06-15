import { useState, useEffect, useRef } from 'react'

export default function PremiumMenu({ restaurant, addToCart }) {
  const [activeCategory, setActiveCategory] = useState(restaurant.menu[0]?.category)
  const [addingItem, setAddingItem] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef(null)

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

      {/* 分类栏 - 橙色背景 */}
      <div
        className="premium-categories"
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: 0,
          right: 0,
          zIndex: 999,
          background: '#ffb300',  // 和 Navbar 一样橙色
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '12px 16px',
          scrollbarWidth: 'none',
          borderBottom: 'none',
          boxShadow: isSticky ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        {restaurant.menu.map((section) => (
          <button
            key={section.category}
            onClick={() => setActiveCategory(section.category)}
            style={{
              border: 'none',
              background: activeCategory === section.category ? '#000000' : '#fff3e0',  // 选中白色，未选中浅橙
              color: activeCategory === section.category ? '#e65100' : '#e65100',  // 深橙色文字
              padding: '8px 16px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
          >
            {section.category}
          </button>
        ))}
      </div>

      {/* 占位符 */}
      {isSticky && <div style={{ height: '52px' }} />}

      {/* 菜单区域 - 白色背景 */}
      <div className="restaurant-menu" style={{
        padding: '20px 16px 80px',
        background: '#ffffff',
      }}>
        {filteredMenu.map((section) => (
          <div key={section.category} className="menu-section">
            <h2 style={{
              fontSize: '22px',
              marginBottom: '18px',
              color: '#e65100',  // 深橙色标题
              borderLeft: '5px solid #ff9800',  // 橙色边框
              paddingLeft: '10px',
              fontWeight: '700',
            }}>
              {section.category}
            </h2>
            <div className="menu-items">
              {section.items.map((item, index) => (
                <div key={index} className="menu-item" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <div className="menu-left" style={{
  flex: 1,
  minWidth: 0,  // 允许收缩
}}>
                    <h3 style={{ fontSize: '16px', margin: 0, color: '#333',wordBreak: 'break-word',  }}>{item.name}</h3>
                    {item.description && (
                      <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="menu-right" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontWeight: '700', color: '#333', fontSize: '16px' ,whiteSpace: 'nowrap',}}>
                      L {item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '999px',
                        border: 'none',
                        background: addingItem === item.name ? '#4CAF50' : '#ff9800',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
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