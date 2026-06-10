export default function Restaurant() {

    return (
  
      <div className="restaurant-page">
  
        <img
          className="restaurant-banner"
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200"
          alt=""
        />
  
        <div className="restaurant-details">
  
          <h1>
            Asados La Entrada
          </h1>
  
          <p className="restaurant-type">
  
            Pollo Frito y Asado
  
          </p>
  
          <div className="restaurant-actions">
  
            <button>
              WhatsApp
            </button>
  
            <button className="menu-btn">
              Ver Menú
            </button>
  
          </div>
  
          <div className="restaurant-info">
  
            <p>
              📍 La Entrada, Copán
            </p>
  
            <p>
              🕒 Abierto ahora
            </p>
  
          </div>
  
        </div>
  
        <div className="menu-images">
  
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200"
            alt=""
          />
  
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200"
            alt=""
          />
  
        </div>
  
      </div>
  
    )
  }