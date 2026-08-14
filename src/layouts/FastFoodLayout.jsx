import { useState } from 'react';
import { Link } from 'react-router-dom';


// ===== 菜单数据 =====
const combos = [
  { id: 'combo1', name: 'COMBO UNO', desc: '1 Base + 1 Proteína + Vegetal Salteado', price: 129 },
  { id: 'combo2', name: 'COMBO DOS', desc: '1 Base + 2 Proteínas + Vegetal Salteado', price: 169 },
];

const bases = [
  { name: 'Arroz Frito' },
  { name: 'Chow Mein' },
  { name: 'Arroz Blanco' },
];

const proteinas = [
  { name: 'Pollo Agridulce', tag: '' },
  { name: 'Pollo Vegetales', tag: '' },
  { name: 'Res con Brócoli', tag: '' },
];

// ===== Extras 更新 =====
const extras = [
  { name: 'Wantan Frito (2 piezas)', price: 20 },
  { name: 'Wantan Frito (4 piezas)', price: 35 },
  { name: 'Arroz Frito Extra', price: 20 },
  { name: 'Chow Mein Extra', price: 20 },
  { name: 'Vegetal Salteado Extra', price: 20 },
];

// ===== Bebidas 新增 =====
const bebidas = [
  { name: 'Pepsi 500ml', price: 25 },
  { name: '7Up 500ml', price: 25 },
  { name: 'Naranja 500ml', price: 25 },
  { name: 'Agua 500ml', price: 25 },
];

export default function FastFoodLayout({ restaurant }) {
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedProteinas, setSelectedProteinas] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    notas: '',
    tipo: 'delivery', // 'delivery' 或 'recoger'
  });
  

  const resetOrder = () => {
    setSelectedCombo(null);
    setSelectedBase(null);
    setSelectedProteinas([]);
    setSelectedExtras([]);
    setSelectedBebida(null);
    setDeliveryInfo({ nombre: '', telefono: '', direccion: '', notas: '', tipo: 'delivery' });
    setStep(1);
  };

  const selectCombo = (combo) => {
    setSelectedCombo(combo);
    setStep(2);
  };

  const selectBase = (base) => {
    setSelectedBase(base);
    setStep(3);
  };

  const toggleProteina = (proteina) => {
    const max = selectedCombo.id === 'combo1' ? 1 : 2;
    setSelectedProteinas((prev) => {
      const exists = prev.find(p => p.name === proteina.name);
      if (exists) {
        return prev.filter(p => p.name !== proteina.name);
      }
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
      if (exists) {
        return prev.filter(e => e.name !== extra.name);
      }
      return [...prev, extra];
    });
  };

  const selectBebida = (bebida) => {
    setSelectedBebida(bebida);
    setStep(6);
  };

  const getTotal = () => {
    let total = selectedCombo ? selectedCombo.price : 0;
    selectedExtras.forEach(e => total += e.price);
    if (selectedBebida) total += selectedBebida.price;
    return total;
  };

  const getWhatsAppMessage = () => {
    let msg = '🆕 *NUEVO PEDIDO*\n\n';
    msg += `🍽️ *${selectedCombo.name}* - L.${selectedCombo.price}\n`;
    msg += `   Vegetal Salteado (incluido)\n`;
    msg += `   Base: ${selectedBase.name}\n`;
    msg += `   Proteínas: ${selectedProteinas.map(p => p.name).join(', ')}\n`;
    if (selectedExtras.length > 0) {
      msg += `   Extras: ${selectedExtras.map(e => `${e.name} (+L.${e.price})`).join(', ')}\n`;
    }
    if (selectedBebida) {
      msg += `   Bebida: ${selectedBebida.name} (+L.${selectedBebida.price})\n`;
    }
    msg += `\n📦 *Tipo de Entrega*\n`;
    if (deliveryInfo.tipo === 'delivery') {
      msg += `   🛵 A DOMICILIO\n`;
      msg += `   📍 ${deliveryInfo.direccion}\n`;
    } else {
      msg += `   🏃 RECOGER \n`;
      
    }
    msg += `   👤 ${deliveryInfo.nombre}\n`;
    msg += `   📱 ${deliveryInfo.telefono}\n`;
    if (deliveryInfo.notas) {
      msg += `   📝 ${deliveryInfo.notas}\n`;
    }
    const total = getTotal();
    msg += `\n💰 *Total: L.${total}*`;
    return encodeURIComponent(msg);
  };

  // ===== Step 1: 选 Combo =====
  const renderComboStep = () => (
    <div>
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

  // ===== Step 2: 选 Base =====
  const renderBaseStep = () => (
    <div>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 2/6</span>
        <span className="ff-step-combo">{selectedCombo?.name}</span>
      </div>
      <h2 className="ff-title">Elige tu Base</h2>
      <p className="ff-subtitle">¿Con qué base prefieres tu combo?</p>
      <div className="ff-grid-3">
  {bases.map((base) => (
    <button
      key={base.name}
      onClick={() => selectBase(base)}
      className={`ff-card ff-card-center ${selectedBase?.name === base.name ? 'ff-card-active' : ''}`}
    >
      <p className="ff-card-title" style={{ fontSize: '14px' }}>{base.name}</p>
    </button>
  ))}
</div>
    </div>
  );

  // ===== Step 3: 选 Proteína =====
  const renderProteinaStep = () => {
    const max = selectedCombo.id === 'combo1' ? 1 : 2;
    return (
      <div>
        <div className="ff-step-label">
          <span className="ff-step-badge">Paso 3/6</span>
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
                {p.tag && <span className="ff-tag">{p.tag}</span>}
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

  // ===== Step 4: 选 Extras =====
  const renderExtrasStep = () => (
    <div>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 4/6</span>
        <span className="ff-step-combo">{selectedCombo?.name}</span>
      </div>
      <h2 className="ff-title">Extras (opcional)</h2>
      <p className="ff-subtitle">Agrega lo que quieras a tu pedido</p>
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

  // ===== Step 5: 选 Bebida =====
  const renderBebidaStep = () => (
    <div>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 5/6</span>
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
        {/* 跳过 bebida 直接进入 Resumen */}
        <button
          onClick={() => setStep(6)}
          className="ff-card ff-card-center"
          style={{ borderStyle: 'dashed' }}
        >
          
          <p className="ff-card-title">Sin bebida</p>
          <p className="ff-card-price-sm" style={{ color: '#888' }}>L.0</p>
        </button>
      </div>
    </div>
  );

// ===== Step 6: 配送信息 =====
const renderDeliveryStep = () => {
  const handleChange = (field, value) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    if (deliveryInfo.tipo === 'delivery') {
      return deliveryInfo.nombre.trim() !== '' &&
             deliveryInfo.telefono.trim() !== '' &&
             deliveryInfo.direccion.trim() !== '';
    }
    // 自取模式：只需要名字，电话可选
    return deliveryInfo.nombre.trim() !== '';
  };

  return (
    <div>
      <div className="ff-step-label">
        <span className="ff-step-badge">Paso 6/6</span>
        <span className="ff-step-combo">{selectedCombo?.name}</span>
      </div>
      <h2 className="ff-title">📦 Información de Entrega</h2>
      <p className="ff-subtitle">¿Cómo quieres recibir tu pedido?</p>

      {/* ===== 自取 / 配送 选项 ===== */}
      <div className="ff-tipo-entrega">
      <button
  className={`ff-tipo-btn ${deliveryInfo.tipo === 'recoger' ? 'ff-tipo-btn-active' : ''}`}
  onClick={() => {
    setDeliveryInfo(prev => ({ ...prev, tipo: 'recoger', direccion: '' }));
  }}
>
  
  <div className="ff-tipo-label">RECOGER</div>
</button>
<button
  className={`ff-tipo-btn ${deliveryInfo.tipo === 'delivery' ? 'ff-tipo-btn-active' : ''}`}
  onClick={() => {
    setDeliveryInfo(prev => ({ ...prev, tipo: 'delivery' }));
  }}
>
  
  <div className="ff-tipo-label">A DOMICILIO</div>
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
    placeholder="Ej:  9999-9999"
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
            placeholder="Ej: Entrada por el parqueo, segundo nivel"
            value={deliveryInfo.notas}
            onChange={(e) => handleChange('notas', e.target.value)}
          />
        </div>

        {!isFormValid() && (
          <p className="ff-form-error">⚠️ Por favor completa los campos obligatorios</p>
        )}

        <button
          onClick={() => setStep(7)}
          className="ff-btn-primary"
          disabled={!isFormValid()}
          style={{
            opacity: isFormValid() ? 1 : 0.5,
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
          }}
        >
          Ver Resumen →
        </button>
      </div>
    </div>
  );
};

  // ===== Step 7: Resumen =====
const renderResumenStep = () => {
  const total = getTotal();
  const whatsappNumber = restaurant.whatsapp || '504XXXXXXXX';
  return (
    <div>
      <h2 className="ff-title text-center">📋 Tu Pedido</h2>
      <div className="ff-resumen">
        {/* ===== 菜品信息 ===== */}
        <div className="ff-resumen-row" style={{ borderBottom: '2px solid #C62828', paddingBottom: '10px' }}>
  <span className="ff-resumen-label" style={{ fontWeight: 900, color: '#C62828', fontSize: '16px' }}>
    {selectedCombo.name}
  </span>
  <span className="ff-resumen-price" style={{ fontWeight: 900,  fontSize: '16px' }}>
    L.{selectedCombo.price}
  </span>
</div>
        <div className="ff-resumen-row">
          <span className="ff-resumen-label">Vegetal Salteado</span>
          
        </div>
        <div className="ff-resumen-row">
          <span className="ff-resumen-label">Base: {selectedBase.name}</span>
          
        </div>
        
        <div className="ff-resumen-row">
          <span className="ff-resumen-label">Proteínas: {selectedProteinas.map(p => p.name).join(', ')}</span>
          
        </div>
        {selectedExtras.length > 0 && (
          <div className="ff-resumen-extras">
            {selectedExtras.map(e => (
              <div key={e.name} className="ff-resumen-row ff-resumen-extra">
                <span className="ff-resumen-label">+ {e.name}</span>
                <span style={{ color: '#999', fontWeight: 500 }}>+L.{e.price}</span>
              </div>
            ))}
          </div>
        )}
        {selectedBebida && (
          <div className="ff-resumen-row">
            <span className="ff-resumen-label">+ {selectedBebida.name}</span>
            <span style={{ color: '#999', fontWeight: 500 }}>+L.{selectedBebida.price}</span>
          </div>
        )}

       
{/* ===== 配送信息 ===== */}
<div className="ff-resumen-delivery">
  <p className="ff-resumen-delivery-title">📦 {deliveryInfo.tipo === 'delivery' ? 'A DOMICILIO' : 'RECOGER'}</p>
  <p>👤 {deliveryInfo.nombre}</p>
  {deliveryInfo.tipo === 'delivery' && <p>📍 {deliveryInfo.direccion}</p>}
  {deliveryInfo.telefono && <p>📱 {deliveryInfo.telefono}</p>}
  {deliveryInfo.notas && <p>📝 {deliveryInfo.notas}</p>}
  
</div>

        <div className="ff-resumen-total">
          <span className="ff-resumen-total-label">Total</span>
          <span className="ff-resumen-total-price">L.{total}</span>
        </div>
      </div>

      <div className="ff-actions">
        <button onClick={() => setStep(6)} className="ff-btn-secondary">
          ← Atrás
        </button>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
          target="_blank"
          rel="noreferrer"
          className="ff-btn-whatsapp"
        >
          Enviar Pedido por WhatsApp
        </a>
      </div>

      <button onClick={resetOrder} className="ff-btn-reset">
        Comenzar nuevo pedido
      </button>
    </div>
  );
};

  // ===== Main Render =====
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
      <p className="ff-header-sub">COMIDA CHINA RÁPIDA </p>
    </div>
    <Link to="/" className="ff-header-close">
      ✕
    </Link>
  </div>
</div>

      {/* Progress */}
      <div className="ff-progress">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="ff-progress-item">
            <div
              className={`ff-progress-dot ${
                s < step ? 'ff-progress-dot-done' : s === step ? 'ff-progress-dot-active' : ''
              }`}
              onClick={() => {
                if (s < step) {
                  // 可以返回到之前的任意步骤（除了第6步不能直接返回第1步）
                  if (step === 6 && s === 5) {
                    setStep(5);
                  } else if (step > s) {
                    setStep(s);
                  }
                }
              }}
              style={{
                cursor: s < step ? 'pointer' : 'default',
              }}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 6 && (
              <div
                className={`ff-progress-line ${s < step ? 'ff-progress-line-done' : ''}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="ff-content">
      {step === 1 && renderComboStep()}
  {step === 2 && renderBaseStep()}
  {step === 3 && renderProteinaStep()}
  {step === 4 && renderExtrasStep()}
  {step === 5 && renderBebidaStep()}
  {step === 6 && renderDeliveryStep()}
  {step === 7 && renderResumenStep()}
      </div>

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
        /* ===== CONTAINER ===== */
        .ff-container {
          min-height: 100vh;
          background: #f5f0eb;
          padding: 16px;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ===== HEADER ===== */
.ff-header {
  background: #C62828;
  color: white;
  padding: 16px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(244, 6, 18, 0.35);
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
  font-family: 'Montserrat', 'Segoe UI', sans-serif;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px;
}
.ff-title-hong {
  color: #FFFFFF;
  letter-spacing: 2px;
}
.ff-title-express {
  color: #FFB800;
  letter-spacing: 1px;
}
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
  right: -12px;
  top: -10px;
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 13px;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
  flex-shrink: 0;
}
.ff-header-close:hover {
  background: rgba(255,255,255,0.3);
}

        /* ===== PROGRESS ===== */
        .ff-progress {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 4px;
        }
        .ff-progress-item {
          display: flex;
          align-items: center;
          flex: 1;
        }
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
        .ff-progress-dot-done {
          background: #C62828;
          color: white;
        }
        .ff-progress-dot-active {
          background: #C62828;
          color: white;
          box-shadow: 0 0 0 4px rgba(244, 6, 18, 0.25);
        }
        .ff-progress-line {
          flex: 1;
          height: 2px;
          background: #e0d6cc;
          margin: 0 4px;
          transition: background 0.3s;
        }
        .ff-progress-line-done {
          background: #C62828;
        }

        /* ===== CONTENT ===== */
        .ff-content {
          background: white;
          border-radius: 24px;
          padding: 24px 20px;
          min-height: 400px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        /* ===== TYPOGRAPHY ===== */
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
        .ff-highlight {
          color: #c0392b;
          font-weight: 700;
        }
        .text-center {
          text-align: center;
        }

        /* ===== STEP LABEL ===== */
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
        .ff-step-combo {
          color: #888;
          font-size: 13px;
        }

        /* ===== GRIDS ===== */
        .ff-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .ff-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        /* ===== CARDS ===== */
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
        .ff-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .ff-card-active {
          border-color: #C62828;
          background: #fff5f3;
          box-shadow: 0 0 0 3px rgba(244, 6, 18, 0.15);
        }
        .ff-card-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ff-card-left {
          text-align: left;
        }
        .ff-card-title {
          font-weight: 700;
          font-size: 15px;
          color: #1a1a1a;
        }
        .ff-card-desc {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .ff-card-price {
          font-size: 22px;
          font-weight: 900;
          color: #C62828;
          margin-top: 8px;
        }
        .ff-card-price-sm {
          font-size: 15px;
          font-weight: 500;
          color: #888;
          margin-top: 4px;
        }
        .ff-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ff-emoji {
          font-size: 28px;
          margin-bottom: 4px;
        }
        .ff-check {
          color: #C62828;
          font-size: 20px;
          font-weight: 700;
        }
        .ff-tag {
          display: inline-block;
          background: #fef3c7;
          color: #b45309;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 30px;
          margin-top: 6px;
        }

        /* ===== SELECTED INFO ===== */
        .ff-selected-info {
          text-align: center;
          color: #888;
          font-size: 14px;
          margin: 16px 0 12px;
        }

        /* ===== BUTTONS ===== */
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
          transition: background 0.2s;
          margin-top: 16px;
        }
        .ff-btn-primary:hover {
          background: #cc0510;
        }
        .ff-btn-secondary {
          background: #e8e0d8;
          color: #1a1a1a;
          border: none;
          border-radius: 30px;
          padding: 14px 24px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          flex: 1;
        }
        .ff-btn-secondary:hover {
          background: #d5cdc5;
        }
        .ff-btn-whatsapp {
          background: #25D366;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          text-align: center;
          flex: 2;
        }
        .ff-btn-whatsapp:hover {
          background: #1da851;
        }
        .ff-btn-reset {
          background: none;
          border: none;
          color: #bbb;
          font-size: 13px;
          text-decoration: underline;
          cursor: pointer;
          width: 100%;
          margin-top: 16px;
          transition: color 0.2s;
        }
        .ff-btn-reset:hover {
          color: #888;
        }

        /* ===== ACTIONS ===== */
        .ff-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        /* ===== RESUMEN ===== */
        .ff-resumen {
          background: #f8f5f2;
          border-radius: 16px;
          padding: 16px;
          margin: 16px 0;
        }
        .ff-resumen-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .ff-resumen-row:last-child {
          border-bottom: none;
        }
        .ff-resumen-label {
          color: #1a1a1a;
          font-size: 14px;
        }
        .ff-resumen-price {
          font-weight: 600;
          font-size: 14px;
          color:#1a1a1a;
        }
        .ff-resumen-extras {
          border-top: 1px solid #eee;
          margin-top: 4px;
          padding-top: 4px;
        }
        .ff-resumen-extra {
          padding: 4px 0;
          border-bottom: none;
        }
        .ff-resumen-extra .ff-resumen-label {
          font-size: 13px;
          color: #1a1a1a;
        }
        .ff-resumen-extra .ff-resumen-price {
          font-size: 13px;
          color: #1a1a1a;
        }
        .ff-resumen-total {
          display: flex;
          justify-content: space-between;
          padding: 12px 0 4px;
          border-top: 2px solid #ddd;
          margin-top: 4px;
        }
        .ff-resumen-total-label {
          font-size: 18px;
          font-weight: 900;
          color: #1a1a1a;
        }
        .ff-resumen-total-price {
          font-size: 22px;
          font-weight: 900;
          color: #1a1a1a;
        }

        /* ===== FOOTER ===== */
        .ff-footer {
          text-align: center;
          color: #bbb;
          font-size: 11px;
          margin-top: 16px;
        }
        .ff-footer-link {
          color: #bbb;
          text-decoration: none;
          font-weight: 600;
        }
        .ff-footer-link:hover {
          text-decoration: underline;
        }

        /* ===== FORM ===== */
.ff-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}
.ff-form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ff-form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.ff-form-input {
  padding: 12px 16px;
  border: 2px solid #e0d6cc;
  border-radius: 12px;
  font-size: 15px;
  transition: border-color 0.2s;
  background: #faf8f6;
}
.ff-form-input:focus {
  border-color: #C62828;
  outline: none;
}
.ff-form-error {
  color: #C62828;
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
}

/* ===== RESUMEN DELIVERY ===== */
.ff-resumen-delivery {
  background: #f0ebe5;
  border-radius: 12px;
  padding: 12px 16px;
  margin: 12px 0;
}
.ff-resumen-delivery-title {
  font-weight: 700;
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}
.ff-resumen-delivery p {
  font-size: 13px;
  color: #.ff-resumen-delivery p ;
  margin: 2px 0;
}

/* ===== TIPO DE ENTREGA ===== */
.ff-tipo-entrega {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}
.ff-tipo-btn {
  display: flex;
  align-items: center;
   justify-content: center;  /* 水平居中 */
  gap: 10px;
  padding: 12px 14px;
  border: 2px solid #e0d6cc;
  border-radius: 14px;
  background: #faf8f6;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.ff-tipo-btn:hover {
  border-color: #C62828;
}
.ff-tipo-btn-active {
  border-color: #C62828;
  background: #fff5f3;
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.15);
}
.ff-tipo-icon {
  font-size: 24px;
}
.ff-tipo-label {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a1a;
}
.ff-tipo-desc {
  font-size: 12px;
  color: #888;
}

        /* ===== RESPONSIVE ===== */
        @media (max-width: 400px) {
          .ff-grid-2 {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .ff-grid-3 {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 8px;
          }
          .ff-card {
            padding: 12px;
          }
          .ff-content {
            padding: 16px;
          }
          .ff-title {
            font-size: 19px;
          }
          .ff-header-title {
            font-size: 19px;
          }
          .ff-progress-dot {
            width: 28px;
            height: 28px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}