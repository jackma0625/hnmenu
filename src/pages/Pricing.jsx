import Navbar from '../components/restaurant/Navbar';
import { Link } from 'react-router-dom';

export default function Pricing() {
  // 你的 WhatsApp 号码（带国家码，不含 + 号）
  const whatsappNumber = '50433514110'; // ← 改成你的号码

  return (
    <>
      <Navbar />

      <div className="pricing-page">
        <div className="pricing-header">
          <h1>Elige el plan perfecto</h1>
          <p>Para tu restaurante en Honduras</p>
        </div>

        <div className="pricing-grid">
          {/* 免费版 */}
          <div className="pricing-card free">
            <div className="pricing-badge">GRATIS</div>
            <h3>Básico</h3>
            <div className="pricing-price">L 0</div>
            <ul>
              <li>✅ Perfil de restaurante</li>
              <li>✅ Menú con imágenes</li>
              <li>✅ WhatsApp directo</li>
              <li>✅ QR code para mesas</li>
              <li>✅ Google Maps</li>
            </ul>
            <span className="pricing-tag">Ideal para pequeños negocios</span>
            <button className="btn-free" disabled>Plan Actual</button>
          </div>

          {/* Premium版 */}
          <div className="pricing-card premium">
            <div className="pricing-badge popular">POPULAR</div>
            <h3>Premium</h3>
            <div className="pricing-price">L 1,999 <span>/año</span></div>
            <ul>
              <li>✅ Todo lo de Básico</li>
              <li>✅ Menú interactivo online</li>
              <li>✅ Carrito de compras</li>
              <li>✅ Pedidos por WhatsApp</li>
              <li>✅ Sin límite de categorías</li>
              <li>✅ Diseño exclusivo</li>
            </ul>
            <span className="pricing-tag">Ideal para restaurantes establecidos</span>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hola%2C%20quiero%20contratar%20el%20plan%20Premium%20de%20HNMenu`}
              target="_blank"
              rel="noopener noreferrer"
              className="plan-btn plan-btn-premium"
            >
              Contratar
            </a>
          </div>

          {/* Custom版 */}
          <div className="pricing-card custom">
            <div className="pricing-badge">DISEÑO</div>
            <h3>Custom</h3>
            <div className="pricing-price">L 4,999 <span>/año</span></div>
            <ul>
              <li>✅ Todo lo de Premium</li>
              <li>✅ Sitio web personalizado</li>
              <li>✅ Tu propio dominio (.com)</li>
              <li>✅ Identidad visual única</li>
              
              <li>✅ SEO avanzado</li>
            </ul>
            <span className="pricing-tag">Ideal para marcas que destacan</span>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hola%2C%20quiero%20contratar%20el%20plan%20Custom%20de%20HNMenu`}
              target="_blank"
              rel="noopener noreferrer"
              className="plan-btn plan-btn-custom"
            >
              Contratar
            </a>
          </div>
        </div>

        <div className="pricing-footer">
          <p>
            ¿Tienes dudas? Contáctame por{' '}
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
          <Link to="/" className="pricing-back">← Volver al inicio</Link>
        </div>
      </div>
    </>
  );
}