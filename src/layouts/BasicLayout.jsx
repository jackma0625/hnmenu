
export default function BasicLayout({

  restaurant,

}) {



{
    restaurant.template === 'basic' && (
      <>
        <img
          className="restaurant-banner"
          src={restaurant.image}
          alt=""
        />

        <div className="restaurant-details">

          <h1>
            {restaurant.name}
          </h1>

          <div className="restaurant-actions">
            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
            >
              <button>
                WhatsApp
              </button>
            </a>
          </div>

          <div className="restaurant-info">
            <a
              href={restaurant.maps}
              target="_blank"
              className="map-link"
            >
              📍 La Entrada, Copán
            </a>
            <p>
              🕒 {restaurant.hours}
            </p>
          </div>
        </div>


        <div className="menu-images">
          {
            restaurant.menuImages.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
              />
            ))
          }
        </div>
      </>
    )
  }
}