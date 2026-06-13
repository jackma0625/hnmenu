export default function CartModal({
  cart,
  setShowCart,
  decreaseQuantity,
  increaseQuantity,
  restaurant,
}) {
  if (!cart.length) return null
  
  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Tu Pedido</h2>
          <button onClick={() => setShowCart(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <span>{item.name}</span>
                <p>x{item.quantity}</p>
              </div>
              <div className="cart-controls">
                <button onClick={() => decreaseQuantity(item.name)}>−</button>
                <span>L {item.price * item.quantity}</span>
                <button onClick={() => increaseQuantity(item.name)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          Total: L {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </div>

        <a
          href={`https://wa.me/${restaurant.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-order"
        >
          Enviar por WhatsApp
        </a>
      </div>
    </div>
  )
}