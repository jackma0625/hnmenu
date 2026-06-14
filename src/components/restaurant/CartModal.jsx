// components/restaurant/CartModal.jsx
import { useEffect, useRef } from 'react';

export default function CartModal({ 
  cart, 
  setShowCart, 
  decreaseQuantity, 
  increaseQuantity, 
  restaurant 
}) {
  const modalRef = useRef(null);

  // 计算总金额
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 点击外部关闭模态框
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCart(false);
      }
    }

    // 按 ESC 键关闭模态框
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        setShowCart(false);
      }
    }

    if (setShowCart) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [setShowCart]);

  // 如果没有购物车数据或没传 setShowCart，不渲染
  if (!setShowCart) return null;

  // 生成 WhatsApp 订单消息
  const generateWhatsAppMessage = () => {
    let message = `🍽️ *Pedido de ${restaurant.name}* 🍽️%0A%0A`;
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} = L. ${item.price * item.quantity}%0A`;
    });
    message += `%0A📊 *Total: L. ${cartTotal}*%0A%0A`;
    message += `📞 Pedido para: (tu nombre)%0A`;
    message += `🚗 Dirección: %0A`;
    message += `💬 Notas: %0A%0A`;
    message += `¡Gracias por tu pedido! 🙏`;
    return message;
  };

  const whatsappNumber = restaurant.phone || '99977489'; // 使用餐厅的电话
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="cart-modal">
      <div className="cart-content" ref={modalRef}>
        <div className="cart-header">
          <h2>🛒 Tu Pedido</h2>
          <button 
  className="close-cart-btn"
  onClick={function() {
    console.log('关闭按钮被点击了');
    setShowCart(false);
  }}
  aria-label="Cerrar carrito"
>
  ✕
</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p>Tu carrito está vacío</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => setShowCart(false)}
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">L. {item.price}</div>
                  </div>
                  <div className="cart-controls">
                    <button 
                      onClick={() => decreaseQuantity(item.name)}
                      className="cart-qty-btn"
                    >
                      −
                    </button>
                    <span className="cart-qty">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.name)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <span>L. {cartTotal}</span>
            </div>

            <a 
              href={whatsappLink}
              className="whatsapp-order"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowCart(false)}
            >
              📱 Pedir por WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}