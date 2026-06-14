// components/restaurant/CartBar.jsx
export default function CartBar({ cart, setShowCart, cartItemCount, cartTotal }) {
  // 如果没有商品，不显示购物车栏
  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="cart-bar" onClick={() => setShowCart(true)}>
      <div className="cart-info">
        <span className="cart-count">🛒 {cartItemCount}</span>
        <span className="cart-items-count">
          {cartItemCount} {cartItemCount === 1 ? 'plato' : 'platos'}
        </span>
      </div>
      <button className="cart-view-btn">
        Ver carrito • L. {cartTotal}
      </button>
    </div>
  );
}