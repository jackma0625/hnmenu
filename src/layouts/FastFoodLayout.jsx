import { useState } from 'react';
import { Link } from 'react-router-dom';

// ===== COMBO 数据 =====
const combos = [
  { id: 'combo1', name: 'COMBO UNO', desc: '1 Base + 1 Proteína + Vegetal Salteado', price: 129 },
  { id: 'combo2', name: 'COMBO DOS', desc: '1 Base + 2 Proteínas + Vegetal Salteado', price: 169 },
  { id: 'combo3', name: 'COMBO MIXTO', desc: '2 Bases + 1 Proteína', price: 149 },
];

const bases = [
  { name: 'Arroz Frito' },
  { name: 'Chow Mein' },
  { name: 'Arroz Blanco' },
];

const proteinas = [
  { name: 'Pollo Agridulce' },
  { name: 'Pollo con Vegetales' },
  { name: 'Res con Brócoli' },
];

const extras = [
  { name: 'Wantan Frito (2 piezas)', price: 20 },
  { name: 'Wantan Frito (4 piezas)', price: 35 },
];

const bebidas = [
  { name: 'Pepsi 500ml', price: 30 },
  { name: '7Up 500ml', price: 30 },
  { name: 'Mirinda Uva 500ml', price: 30 },
  { name: 'Mirinda Naranja 500ml', price: 30 },
  { name: 'Té Lipton 500ml', price: 35 },
  { name: 'Agua 500ml', price: 25 },
];

// ===== A LA CARTA 数据 =====
const alaCarta = [
  { id: 'ac1', name: 'Wantan Frito (18 unidades)', price: 160 },
  { id: 'ac2', name: 'Papas Fritas', price: 110 },
  { id: 'ac3', name: 'Camarón Empanizado', price: 250 },
  { id: 'ac4', name: 'Camarón al Ajillo', price: 250 },
  { id: 'ac5', name: 'Camarón a la Plancha', price: 250 },
  { id: 'ac6', name: 'Pollo a la Plancha', price: 180 },
  { id: 'ac7', name: 'Pollo Empanizado', price: 180 },
  { id: 'ac8', name: 'Res a la Plancha', price: 230 },
  { id: 'ac9', name: 'Chuleta Encebollada y Tomatada', price: 250 },
  { id: 'ac10', name: 'Sopa Marinera', price: 250 },
  { id: 'ac11', name: 'Sopa de Camarón', price: 200 },
  { id: 'ac12', name: 'Sopa Wantan', price: 160 },
  { id: 'ac13', name: 'Sopa de Pollo', price: 150 },
  { id: 'ac14', name: 'Sopa de Res', price: 170 },
  { id: 'ac15', name: 'Sopa Filete de Pescado', price: 220 },
  { id: 'ac16', name: 'Arroz con Pollo (Personal)', price: 100 },
  { id: 'ac17', name: 'Arroz con Pollo (Medio)', price: 170 },
  { id: 'ac18', name: 'Arroz con Pollo (Normal)', price: 200 },
  { id: 'ac19', name: 'Arroz con Pollo (Familia)', price: 250 },
  { id: 'ac20', name: 'Arroz con Pollo (450)', price: 450 },
  { id: 'ac21', name: 'Arroz con Pollo (550)', price: 550 },
  { id: 'ac22', name: 'Arroz con Pollo (900)', price: 900 },
  { id: 'ac23', name: 'Arroz con Pollo (1000)', price: 1000 },
];

export default function FastFoodLayout({ restaurant }) {
  // ===== 页面模式 =====
  const [mode, setMode] = useState(null); // null=首页, 'combo', 'alacarta'
  const [step, setStep] = useState(1);

  // ===== 购物车 =====
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // ===== COMBO 选择状态 =====
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedBases, setSelectedBases] = useState([]);
  const [selectedProteinas, setSelectedProteinas] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedBebida, setSelectedBebida] = useState(null);

  // ===== 配送信息 =====
  const [deliveryInfo, setDeliveryInfo] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    notas: '',
    tipo: 'delivery',
  });

  // ===== 购物车操作 =====
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.cartId === item.cartId);
      if (existing) {
        return prev.map(i =>
          i.cartId === item.cartId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (cartId) => {
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (cartId) => {
    setCart(prev =>
      prev
        .map(i => i.cartId === cartId ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ===== 重置 =====
  const resetCombo = () => {
    setSelectedCombo(null);
    setSelectedBases([]);
    setSelectedProteinas([]);
    setSelectedExtras([]);
    setSelectedBebida(null);
    setStep(1);
  };

  // ===== COMBO 操作 =====
  const selectCombo = (combo) => {
    setSelectedCombo(combo);
    setSelectedBases([]);
    setSelectedProteinas([]);
    setSelectedExtras([]);
    setSelectedBebida(null);
    setStep(2);
  };

  const selectBase = (base) => {
    const maxBases = selectedCombo.id === 'combo3' ? 2 : 1;
    setSelectedBases((prev) => {
      const exists = prev.find(b => b.name === base.name);
      if (exists) return prev.filter(b => b.name !== base.name);
      if (prev.length >= maxBases) {
        alert(`Combo ${selectedCombo.name} solo permite ${maxBases} base${maxBases > 1 ? 's' : ''}`);
        return prev;
      }
      return [...prev, base];
    });
  };

  const toggleProteina = (proteina) => {
    const max = selectedCombo.id === 'combo2' ? 2 : 1;
    setSelectedProteinas((prev) => {
      const exists = prev.find(p => p.name === proteina.name);
      if (exists) return prev.filter(p => p.name !== proteina.name);
      if (prev.length >= max) {
        alert(`Combo ${selectedCombo.name} solo permite ${max} proteína${max > 1 ? 's' : ''}`);
        return prev;
      }
      return [...prev, proteina];
    });
  };

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find(e => e.name === extra.name);
      if (exists) return prev.filter(e => e.name !== extra.name);
      return [...prev, extra];
    });
  };

  const selectBebida = (bebida) => {
    setSelectedBebida(bebida);
    setStep(6);
  };

  // ===== 把 COMBO 加入购物车 =====
  const addComboToCart = (bebidaOverride) => {
    const bebida = bebidaOverride !== undefined ? bebidaOverride : selectedBebida;
    const extrasText = selectedExtras.length > 0
      ? ` + ${selectedExtras.map(e => e.name).join(' + ')}`
      : '';
    const bebidaText = bebida ? ` + ${bebida.name}` : '';
    const details = `${selectedBases.map(b => b.name).join(' + ')} + ${selectedProteinas.map(p => p.name).join(' + ')}${bebidaText}${extrasText}`;
    const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const basePrice = selectedCombo.price + (bebida ? bebida.price : 0) + extrasPrice;

    addToCart({
      cartId: `combo-${Date.now()}`,
      name: `${selectedCombo.name} (${details})`,
      price: basePrice,
      type: 'combo',
    });

    resetCombo();
    setMode(null);
  };

  // ===== 把 A LA CARTA 加入购物车 =====
  const addAlaCartaToCart = (item) => {
    addToCart({
      cartId: `ac-${item.id}`,
      name: item.name,
      price: item.price,
      type: 'alacarta',
    });
  };

  // ===== WhatsApp 消息 =====
  const getWhatsAppMessage = () => {
    let msg = '🆕 *NUEVO PEDIDO*\n\n';
    cart.forEach(item => {
      msg += `▪️ ${item.qty}x ${item.name} — L.${item.price * item.qty}\n`;
    });
    msg += `\n📦 *Tipo de Entrega*\n`;
    if (deliveryInfo.tipo === 'delivery') {
      msg += `   🛵 A domicilio\n`;
      msg += `   📍 ${deliveryInfo.direccion}\n`;
    } else {
      msg += `   🏃 Recoger en tienda\n`;
    }
    msg += `   👤 ${deliveryInfo.nombre}\n`;
    msg += `   📱 ${deliveryInfo.telefono}\n`;
    if (deliveryInfo.notas) {
      msg += `   📝 ${deliveryInfo.notas}\n`;
    }
    msg += `\n💰 *Total: L.${cartTotal}*`;
    return encodeURIComponent(msg);
  };

  // ============================================================
  // ===== 首页：模式选择 =====
  // ============================================================
  const renderHome = () => (
    <div>
      <h2 className="ff-title text-center">¿Qué deseas ordenar?</h2>
      <p className="ff-subtitle text-center">Elige cómo quieres pedir hoy</p>
      <div className="ff-mode-grid">
        <button
          className="ff-mode-card"
          onClick={() => { setMode('combo'); setStep(1); }}
        >
          <span className="ff-mode-name">COMBO</span>
          <span className="ff-mode-desc">Combos rápidos con base, proteína y más</span>
        </button>
        <button
          className="ff-mode-card"
          onClick={() => setMode('alacarta')}
        >
          <span className="ff-mode-name">A LA CARTA</span>
          <span className="ff-mode-desc">Elige tus platos favoritos uno por uno</span>
        </button>
      </div>
    </div>
  );

  // ============================================================
  // ===== COMBO 步骤 =====
  // ============================================================
  const renderComboStep = () => (
    <div>
      <button className="ff-back-link" onClick={() => setMode(null)}>← Volver</button>
      <h2 className="ff-title">🍽️ Elige tu Combo</h2>
      <p className="ff-subtitle">¿Qué combo prefieres hoy?</p>
      <div className="ff-grid-2">
        {combos.map((combo) => (
          <button
            key={combo.id}
            onClick={() => selectCombo(combo)}
            className={`ff-card ${selectedCombo?.id === combo.id ? 'ff-card-active' : ''}`}
          >
            <h3 className="ff-card-title">{combo.name}</h3>
            <p className="ff-card-desc">{combo.desc}</p>
            <p className="ff-card-price">L.{combo.price}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBaseStep = () => {
    const maxBases = selectedCombo.id === 'combo3' ? 2 : 1;
    return (
      <div>
        <button className="ff-back-link" onClick={() => setStep(1)}>← Atrás</button>
        <div className="ff-step-label">
          <span className="ff-step-badge">Paso 2/5</span>
          <span className="ff-step-combo">{selectedCombo?.name}</span>
        </div>
        <h2 className="ff-title">Elige tu Base</h2>
        <p className="ff-subtitle">
          Puedes elegir <span className="ff-highlight">{maxBases}</span> base{maxBases > 1 ? 's' : ''}
        </p>
        <div className="ff-grid-3">
          {bases.map((base) => {
            const isSelected = selectedBases.find(b => b.name === base.name);
            return (
              <button
                key={base.name}
                onClick={() => selectBase(base)}
                className={`ff-card ff-card-center ${isSelected ? 'ff-card-active' : ''}`}
              >
                <p className="ff-card-title" style={{ fontSize: '14px' }}>{base.name}</p>
                {isSelected && <span className="ff-check">✓</span>}
              </button>
            );
          })}
        </div>
        <div className="ff-selected-info">
          Seleccionadas: {selectedBases.map(b => b.name).join(', ') || 'Ninguna'}
        </div>
        {selectedBases.length >= maxBases && (
          <button onClick={() => setStep(3)} className="ff-btn-primary">
            Siguiente →
          </button>
        )}
      </div>
    );
  };

  const renderProteinaStep = () => {
    const max = selectedCombo.id === 'combo2' ? 2 : 1;
    return (
      <div>
        <button className="ff-back-link" onClick={() => setStep(2)}>← Atrás</button>
        <div className="ff-step-label">
          <span className="ff-step-badge">Paso 3/5</span>
          <span className="ff-step-combo">{selectedCombo?.name}</span>
        </div>
        <h2 className="ff-title">Elige tu Proteína</h2>
        <p className="ff-subtitle">
          Puedes elegir <span className="ff-highlight">{max}</span> proteína{max > 1 ? 's' : ''}
        </p>
        <div className="ff-grid-2">
          {proteinas.map((p) => {
            const isSelected = selectedProteinas.find(p2 => p2.name === p.name);
            return (
              <button
                key={p.name}
                onClick={() => toggleProteina(p)}
                className={`ff-card ff-card-left ${isSelected ? 'ff-card-active' : ''}`}
              >
                <div className="ff-card-row">
                  <span className="ff-card-title">{p.name}</span>
                  {isSelected && <span className="ff-check">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
        <div className="ff-selected-info">
          Seleccionadas: {selectedProteinas.map(p => p.name).join(', ') || 'Ninguna'}
        </div>
        {selectedProteinas.length >= max && (
          <button onClick={() => setStep(4)} className="ff-btn-primary">
            Siguiente →
          </button>
        )}
      </div>
    );
  };

  const renderExtrasStep = () => (
    <div>
      <button className="ff-back-link" onClick={() => setStep(3)}>← Atrás</button>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 4/5</span>
        <span className="ff-step-combo">{selectedCombo?.name}</span>
      </div>
      <h2 className="ff-title">Extras (opcional)</h2>
      <p className="ff-subtitle">¿Quieres agregar Wantan Frito?</p>
      <div className="ff-grid-2">
        {extras.map((extra) => {
          const isSelected = selectedExtras.find(e => e.name === extra.name);
          return (
            <button
              key={extra.name}
              onClick={() => toggleExtra(extra)}
              className={`ff-card ff-card-left ${isSelected ? 'ff-card-active' : ''}`}
            >
              <div className="ff-card-row">
                <span className="ff-card-title">{extra.name}</span>
                {isSelected && <span className="ff-check">✓</span>}
              </div>
              <p className="ff-card-price-sm">+L.{extra.price}</p>
            </button>
          );
        })}
      </div>
      <button onClick={() => setStep(5)} className="ff-btn-primary">
        Siguiente →
      </button>
    </div>
  );

  const renderBebidaStep = () => (
    <div>
      <button className="ff-back-link" onClick={() => setStep(4)}>← Atrás</button>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 5/5</span>
        <span className="ff-step-combo">{selectedCombo?.name}</span>
      </div>
      <h2 className="ff-title">Elige tu Bebida (opcional)</h2>
      <p className="ff-subtitle">¿Qué quieres tomar con tu combo?</p>
      <div className="ff-grid-2">
        {bebidas.map((bebida) => (
          <button
            key={bebida.name}
            onClick={() => selectBebida(bebida)}
            className={`ff-card ff-card-center ${selectedBebida?.name === bebida.name ? 'ff-card-active' : ''}`}
          >
            <p className="ff-card-title" style={{ fontSize: '14px' }}>{bebida.name}</p>
            <p className="ff-card-price-sm">+L.{bebida.price}</p>
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedBebida(null);
            addComboToCart(null);
          }}
          className="ff-card ff-card-center"
          style={{ borderStyle: 'dashed' }}
        >
          <p className="ff-card-title">Sin bebida</p>
          <p className="ff-card-price-sm" style={{ color: '#1a1a1a' }}>L.0</p>
        </button>
      </div>
      {selectedBebida && (
        <button
          onClick={() => addComboToCart(selectedBebida)}
          className="ff-btn-primary"
          style={{ marginTop: '16px' }}
        >
          🛒 Agregar al carrito · L.{selectedCombo.price + selectedBebida.price + selectedExtras.reduce((s, e) => s + e.price, 0)}
        </button>
      )}
    </div>
  );

  // ============================================================
  // ===== A LA CARTA =====
  // ============================================================
  const renderAlaCarta = () => (
    <div>
      <button className="ff-back-link" onClick={() => setMode(null)}>← Volver</button>
      <h2 className="ff-title">🍜 A la Carta</h2>
      <p className="ff-subtitle">Elige tus platos favoritos</p>

      <div className="ff-alacarta-list">
        {alaCarta.map(item => {
          const inCart = cart.find(i => i.cartId === `ac-${item.id}`);
          return (
            <div key={item.id} className="ff-alacarta-item">
              <div className="ff-alacarta-info">
                <span className="ff-alacarta-name">{item.name}</span>
                <span className="ff-alacarta-price">L.{item.price}</span>
              </div>
              <button
                className={`ff-alacarta-add ${inCart ? 'ff-alacarta-add-active' : ''}`}
                onClick={() => addAlaCartaToCart(item)}
              >
                {inCart ? `✓ ${inCart.qty}` : '+'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ============================================================
  // ===== 结算页 =====
  // ============================================================
  const renderCheckout = () => {
    const handleChange = (field, value) => {
      setDeliveryInfo(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = () => {
      if (deliveryInfo.tipo === 'delivery') {
        return deliveryInfo.nombre.trim() !== '' &&
               deliveryInfo.telefono.trim() !== '' &&
               deliveryInfo.direccion.trim() !== '';
      }
      return deliveryInfo.nombre.trim() !== '';
    };

    const whatsappNumber = restaurant.whatsapp || '504XXXXXXXX';

    return (
      <div>
        <button className="ff-back-link" onClick={() => setShowCheckout(false)}>← Volver al carrito</button>
        <h2 className="ff-title">📦 Información de Entrega</h2>
        <p className="ff-subtitle">¿Cómo quieres recibir tu pedido?</p>

        <div className="ff-tipo-entrega">
          <button
            className={`ff-tipo-btn ${deliveryInfo.tipo === 'recoger' ? 'ff-tipo-btn-active' : ''}`}
            onClick={() => setDeliveryInfo(prev => ({ ...prev, tipo: 'recoger', direccion: '' }))}
          >
            <span className="ff-tipo-label">RECOGER</span>
          </button>
          <button
            className={`ff-tipo-btn ${deliveryInfo.tipo === 'delivery' ? 'ff-tipo-btn-active' : ''}`}
            onClick={() => setDeliveryInfo(prev => ({ ...prev, tipo: 'delivery' }))}
          >
            <span className="ff-tipo-label">A DOMICILIO</span>
          </button>
        </div>

        <div className="ff-form">
          <div className="ff-form-group">
            <label className="ff-form-label">Tu nombre *</label>
            <input
              type="text"
              className="ff-form-input"
              placeholder="Ej: Juan Pérez"
              value={deliveryInfo.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
            />
          </div>

          <div className="ff-form-group">
            <label className="ff-form-label">
              Teléfono {deliveryInfo.tipo === 'delivery' ? '*' : '(opcional)'}
            </label>
            <input
              type="tel"
              className="ff-form-input"
              placeholder="Ej: 504 9999 9999"
              value={deliveryInfo.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
            />
          </div>

          {deliveryInfo.tipo === 'delivery' && (
            <div className="ff-form-group">
              <label className="ff-form-label">Dirección *</label>
              <input
                type="text"
                className="ff-form-input"
                placeholder="Ej: Colonia Las Flores, casa #12"
                value={deliveryInfo.direccion}
                onChange={(e) => handleChange('direccion', e.target.value)}
              />
            </div>
          )}

          <div className="ff-form-group">
            <label className="ff-form-label">Notas (opcional)</label>
            <input
              type="text"
              className="ff-form-input"
              placeholder="Ej: Entrada por el parqueo"
              value={deliveryInfo.notas}
              onChange={(e) => handleChange('notas', e.target.value)}
            />
          </div>

          {!isFormValid() && (
            <p className="ff-form-error">⚠️ Por favor completa los campos obligatorios</p>
          )}

          <a
            href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noreferrer"
            className="ff-btn-whatsapp-full"
            style={{
              opacity: isFormValid() ? 1 : 0.5,
              pointerEvents: isFormValid() ? 'auto' : 'none',
              display: 'block',
              marginTop: '16px',
            }}
          >
            📱 Enviar Pedido por WhatsApp · L.{cartTotal}
          </a>
        </div>
      </div>
    );
  };

  // ============================================================
  // ===== 购物车弹窗 =====
  // ============================================================
  const renderCartModal = () => {
    if (!showCart) return null;
    return (
      <div className="ff-cart-overlay" onClick={() => setShowCart(false)}>
        <div className="ff-cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="ff-cart-header">
            <h3>🛒 Tu Pedido</h3>
            <button className="ff-cart-close" onClick={() => setShowCart(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p className="ff-cart-empty">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="ff-cart-items">
                {cart.map(item => (
                  <div key={item.cartId} className="ff-cart-item">
                    <div className="ff-cart-item-info">
                      <span className="ff-cart-item-name">{item.name}</span>
                      <span className="ff-cart-item-price">L.{item.price * item.qty}</span>
                    </div>
                    <div className="ff-cart-item-controls">
                      <button onClick={() => decreaseQty(item.cartId)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.cartId)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ff-cart-total">
                <span>Total</span>
                <span>L.{cartTotal}</span>
              </div>

              <button
                className="ff-btn-primary"
                onClick={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
              >
                Continuar →
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // ===== Main Render =====
  // ============================================================
  return (
    <div className="ff-container">
      {/* Header */}
      <div className="ff-header">
        <div className="ff-header-content">
          <div>
            <h1 className="ff-header-title">
              <span className="ff-title-hong">HONG KONG</span>{' '}
              <span className="ff-title-express">EXPRESS</span>
            </h1>
            <p className="ff-header-sub">Comida China Rápida · La Entrada, Copán</p>
          </div>
          <Link to="/" className="ff-header-close">✕</Link>
        </div>
      </div>

      {/* COMBO 进度条 */}
      {mode === 'combo' && !showCheckout && (
        <div className="ff-progress">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="ff-progress-item">
              <div
                className={`ff-progress-dot ${
                  s < step ? 'ff-progress-dot-done' : s === step ? 'ff-progress-dot-active' : ''
                }`}
                onClick={() => { if (s < step) setStep(s); }}
                style={{ cursor: s < step ? 'pointer' : 'default' }}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 5 && (
                <div className={`ff-progress-line ${s < step ? 'ff-progress-line-done' : ''}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="ff-content">
        {showCheckout ? (
          renderCheckout()
        ) : (
          <>
            {mode === null && renderHome()}
            {mode === 'combo' && (
              <>
                {step === 1 && renderComboStep()}
                {step === 2 && renderBaseStep()}
                {step === 3 && renderProteinaStep()}
                {step === 4 && renderExtrasStep()}
                {step === 5 && renderBebidaStep()}
              </>
            )}
            {mode === 'alacarta' && renderAlaCarta()}
          </>
        )}
      </div>

      {/* 购物车浮动条 */}
      {cartCount > 0 && !showCheckout && (
        <button className="ff-cart-bar" onClick={() => setShowCart(true)}>
          <span>🛒 {cartCount} producto{cartCount > 1 ? 's' : ''}</span>
          <span className="ff-cart-bar-total">L.{cartTotal}</span>
        </button>
      )}

      {/* 购物车弹窗 */}
      {renderCartModal()}

      {/* Footer */}
      <footer className="ff-footer">
        © 2026 Hong Kong Express · Menú digital por{' '}
        <a href="https://hnmenu.com" target="_blank" rel="noreferrer" className="ff-footer-link">
          HNMenu
        </a>
      </footer>

      {/* ===== CSS ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap');

        .ff-container {
          min-height: 100vh;
          background: #f5f0eb;
          padding: 16px;
          max-width: 480px;
          margin: 0 auto;
          padding-bottom: 100px;
        }

        .ff-header {
          background: #C62828;
          color: white;
          padding: 16px 20px;
          border-radius: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(198, 40, 40, 0.35);
        }
        .ff-header-content {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .ff-header-title {
          font-size: 20px;
          font-weight: 900;
          font-family: 'Montserrat', 'Segoe UI', sans-serif !important;
          line-height: 1.2;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
        }
        .ff-title-hong { color: #FFFFFF; letter-spacing: 2px; }
        .ff-title-express { color: #FFB800; letter-spacing: 1px; }
        .ff-header-sub {
          font-size: 12px;
          color: #FFFFFF;
          margin-top: 4px;
          font-weight: 400;
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          text-align: center;
          letter-spacing: 1px;
        }
        .ff-header-close {
          position: absolute;
          right: -8px;
          top: -8px;
          background: rgba(255,255,255,0.2);
          padding: 4px 10px;
          border-radius: 30px;
          font-size: 13px;
          color: white;
          text-decoration: none;
        }
        .ff-header-close:hover { background: rgba(255,255,255,0.3); }

        .ff-progress {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 4px;
        }
        .ff-progress-item { display: flex; align-items: center; flex: 1; }
        .ff-progress-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          transition: all 0.3s;
          background: #e0d6cc;
          color: #aaa;
          user-select: none;
        }
        .ff-progress-dot-done { background: #C62828; color: white; }
        .ff-progress-dot-active {
          background: #C62828;
          color: white;
          box-shadow: 0 0 0 4px rgba(198, 40, 40, 0.25);
        }
        .ff-progress-line {
          flex: 1;
          height: 2px;
          background: #e0d6cc;
          margin: 0 4px;
        }
        .ff-progress-line-done { background: #C62828; }

        .ff-content {
          background: white;
          border-radius: 24px;
          padding: 24px 20px;
          min-height: 400px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .ff-back-link {
          background: none;
          border: none;
          color: #888;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          margin-bottom: 12px;
        }
        .ff-back-link:hover { color: #C62828; }

        .ff-title {
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 4px;
          color: #1a1a1a;
        }
        .ff-subtitle {
          color: #888;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .ff-highlight { color: #C62828; font-weight: 700; }
        .text-center { text-align: center; }

        .ff-step-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .ff-step-badge {
          background: #C62828;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 12px;
          border-radius: 30px;
        }
        .ff-step-combo { color: #888; font-size: 13px; }

        .ff-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ff-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

        .ff-card {
          background: #f8f5f2;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }
        .ff-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .ff-card-active {
          border-color: #C62828;
          background: #fff5f3;
          box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.15);
        }
        .ff-card-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ff-card-left { text-align: left; }
        .ff-card-title { font-weight: 700; font-size: 15px; color: #1a1a1a; }
        .ff-card-desc { font-size: 12px; color: #888; margin-top: 4px; }
        .ff-card-price { font-size: 22px; font-weight: 900; color: #C62828; margin-top: 8px; }
        .ff-card-price-sm { font-size: 15px; font-weight: 600; color: #999; margin-top: 4px; }
        .ff-card-row { display: flex; justify-content: space-between; align-items: center; }
        .ff-check { color: #C62828; font-size: 20px; font-weight: 700; }

        .ff-selected-info {
          text-align: center;
          color: #888;
          font-size: 14px;
          margin: 16px 0 12px;
        }

        .ff-btn-primary {
          background: #C62828;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px;
          font-size: 16px;
          font-weight: 700;
          width: 100%;
          cursor: pointer;
          margin-top: 16px;
        }
        .ff-btn-primary:hover { background: #a52626; }

        /* ===== MODE SELECTION ===== */
        .ff-mode-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        .ff-mode-card {
          background: #f8f5f2;
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 36px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .ff-mode-card:hover {
          border-color: #C62828;
          background: #fff5f3;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(198, 40, 40, 0.12);
        }
        .ff-mode-name {
          font-size: 20px;
          font-weight: 900;
          color: #1a1a1a;
          letter-spacing: 1px;
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
        }
        .ff-mode-desc { font-size: 13px; color: #888; margin-top: 2px; }

        /* ===== A LA CARTA ===== */
        .ff-alacarta-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ff-alacarta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #f8f5f2;
          border-radius: 14px;
        }
        .ff-alacarta-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }
        .ff-alacarta-name {
          font-weight: 700;
          font-size: 14px;
          color: #1a1a1a;
        }
        .ff-alacarta-price {
          font-size: 14px;
          color: #888;
        }
        .ff-alacarta-add {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #C62828;
          color: white;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .ff-alacarta-add:active { transform: scale(0.9); }
        .ff-alacarta-add-active {
          background: #4CAF50;
          font-size: 13px;
        }

        /* ===== 购物车浮动条 ===== */
        .ff-cart-bar {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 448px;
          background: #1a1a1a;
          color: white;
          border: none;
          border-radius: 18px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .ff-cart-bar-total {
          background: #C62828;
          padding: 6px 14px;
          border-radius: 30px;
        }

        /* ===== 购物车弹窗 ===== */
        .ff-cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .ff-cart-modal {
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 20px;
          width: 100%;
          max-width: 480px;
          max-height: 80vh;
          overflow-y: auto;
        }
        .ff-cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #C62828;
        }
        .ff-cart-header h3 {
          font-size: 18px;
          font-weight: 900;
          color: #1a1a1a;
          margin: 0;
        }
        .ff-cart-close {
          background: #f0f0f0;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
        }
        .ff-cart-empty {
          text-align: center;
          color: #888;
          padding: 40px 20px;
        }
        .ff-cart-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ff-cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }
        .ff-cart-item-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
          padding-right: 12px;
        }
        .ff-cart-item-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .ff-cart-item-price {
          font-size: 13px;
          color: #888;
        }
        .ff-cart-item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f5f5f5;
          padding: 4px 8px;
          border-radius: 30px;
        }
        .ff-cart-item-controls button {
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 50%;
          background: #C62828;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .ff-cart-item-controls span {
          min-width: 20px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
        }
        .ff-cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 900;
          padding: 12px 0;
          border-top: 2px solid #ddd;
          color: #1a1a1a;
        }

        /* ===== 结算表单 ===== */
        .ff-tipo-entrega {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .ff-tipo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 14px;
          border: 2px solid #e0d6cc;
          border-radius: 14px;
          background: #faf8f6;
          cursor: pointer;
          text-align: center;
          width: 100%;
          transition: all 0.2s;
        }
        .ff-tipo-btn:hover { border-color: #C62828; }
        .ff-tipo-btn-active {
          border-color: #C62828;
          background: #fff5f3;
          box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.15);
        }
        .ff-tipo-label {
          font-weight: 700;
          font-size: 15px;
          color: #1a1a1a;
          width: 100%;
        }

        .ff-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 8px;
        }
        .ff-form-group { display: flex; flex-direction: column; gap: 4px; }
        .ff-form-label { font-size: 14px; font-weight: 600; color: #333; }
        .ff-form-input {
          padding: 12px 16px;
          border: 2px solid #e0d6cc;
          border-radius: 12px;
          font-size: 15px;
          background: #faf8f6;
        }
        .ff-form-input:focus { border-color: #C62828; outline: none; }
        .ff-form-error {
          color: #C62828;
          font-size: 13px;
          text-align: center;
        }
        .ff-btn-whatsapp-full {
          background: #25D366;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 16px;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
        }
        .ff-btn-whatsapp-full:hover { background: #1da851; }

        .ff-footer {
          text-align: center;
          color: #bbb;
          font-size: 11px;
          margin-top: 16px;
        }
        .ff-footer-link { color: #bbb; text-decoration: none; font-weight: 600; }
        .ff-footer-link:hover { text-decoration: underline; }

        @media (max-width: 400px) {
          .ff-grid-2 { gap: 8px; }
          .ff-grid-3 { gap: 8px; }
          .ff-card { padding: 12px; }
          .ff-content { padding: 16px; }
          .ff-title { font-size: 19px; }
          .ff-header-title { font-size: 19px; }
          .ff-progress-dot { width: 28px; height: 28px; font-size: 10px; }
        }
      `}</style>
    </div>
  );
}