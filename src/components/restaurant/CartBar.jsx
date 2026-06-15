export default function CartBar({ cart, setShowCart, cartItemCount, cartTotal }) {
  if (!cart || cart.length === 0) return null;

  return (
    <div className="cart-bar">
      <div className="cart-info">
        <span>🛒 {cartItemCount} productos</span>
      </div>
      <button onClick={() => setShowCart(true)} className="cart-view-btn">
        Ver Pedido • L {cartTotal}
      </button>
    </div>
  );
}