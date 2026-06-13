export default function CartBar({ cart, setShowCart }) {
  if (cart.length === 0) return null
  
  return (
    <div className="cart-bar">
      <div>🛒 {cart.length} productos</div>
      <button onClick={() => setShowCart(true)}>Ver Pedido</button>
    </div>
  )
}