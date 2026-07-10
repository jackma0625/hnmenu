import Navbar from '../components/restaurant/Navbar';
import { Link } from 'react-router-dom';

export default function Pricing() {
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
            <button className="btn-premium">Contratar</button>
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
            <button className="btn-custom">Contratar</button>
          </div>
        </div>

        <div className="pricing-footer">
          <p>
            ¿Tienes dudas? Contáctame por{' '}
            <a href="https://wa.me/50433514110" target="_blank" rel="noreferrer">
              WhatsApp
            </a>{' '}
           
          </p>
          <Link to="/" className="pricing-back">← Volver al inicio</Link>
        </div>
      </div>
    </>
  );
}