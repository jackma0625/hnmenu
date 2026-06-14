export default function MenuSection({
  section,
  addToCart,
  theme,
}) {
  return (
    <section className="menu-section">
      <h2
        style={{
          color: theme?.colors?.primary,
          borderLeft: `5px solid ${theme?.colors?.secondary}`,
          fontFamily: theme?.fonts?.heading,
        }}
      >
        {section.category}
      </h2>

      <div className="menu-items">
        {section.items.map((item, index) => (
         
<div

  key={index}

  className="menu-item"

>

            <div>
              <h3>{item.name}</h3>
              {item.options && (
                <p className="item-options">
                  {item.options.join(' • ')}
                </p>
              )}
            </div>

            <div className="menu-right">
              <span>L {item.price}</span>
              <button
                onClick={() => addToCart(item)}
                style={{
                  background: theme?.colors?.primary,
                  color: theme?.colors?.buttonText,
                  borderRadius: theme?.radius?.button,
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}