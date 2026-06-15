export default function CartModal({
  cart,
  setShowCart,
  decreaseQuantity,
  increaseQuantity,
  restaurant,
}) {
  if (!cart || cart.length === 0) return null;

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Tu Pedido</h2>
          <button className="close-cart-btn" onClick={() => setShowCart(false)}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">L {item.price}</div>
              </div>
              <div className="cart-controls">
                <button onClick={() => decreaseQuantity(item.name)}>−</button>
                <span className="cart-qty">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.name)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <span>Total:</span>
          <span>L {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
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
  );
}