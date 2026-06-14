import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PremiumMenu from '../components/restaurant/PremiumMenu';
import RestaurantHeader from '../components/restaurant/RestaurantHeader';
import CartModal from '../components/restaurant/CartModal';
import CartBar from '../components/restaurant/CartBar';

export default function PremiumLayout({ restaurant }) {
  const theme = restaurant.theme;
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // 从 localStorage 加载购物车
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${restaurant.id}`);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, [restaurant.id]);

  // 保存购物车到 localStorage
  useEffect(() => {
    localStorage.setItem(`cart_${restaurant.id}`, JSON.stringify(cart));
  }, [cart, restaurant.id]);

  function addToCart(item) {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setLastAddedItem(item.name);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setLastAddedItem(null);
    }, 2000);
  }

  function increaseQuantity(name) {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(name) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      {showToast && (
        <div className="toast-notification">
          <span className="toast-icon">✅</span>
          <span className="toast-text">{lastAddedItem} agregado al carrito</span>
        </div>
      )}

      <Link to="/" className="back-button">
        ← Volver
      </Link>

      <RestaurantHeader restaurant={restaurant} theme={theme} />

      {cart.length > 0 && (
        <CartBar
          cart={cart}
          setShowCart={setShowCart}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
        />
      )}

      <CartModal
        cart={cart}
        setShowCart={setShowCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        restaurant={restaurant}
      />

      <PremiumMenu restaurant={restaurant} theme={theme} addToCart={addToCart} />
    </>
  );
}