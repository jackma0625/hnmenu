
export default function BasicLayout({

  restaurant,

}) {

  return (

    <>

      <img

        className="restaurant-banner"

        src={restaurant.image}

        alt={restaurant.name}

      />

      <div className="restaurant-details">

        <h1>

          {restaurant.name}

        </h1>

        <div className="restaurant-actions">

          <a

            href={`https://wa.me/${restaurant.whatsapp}`}

            target="_blank"

            rel="noopener noreferrer"

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

            rel="noopener noreferrer"

            className="map-link"

          >

            📍 {restaurant.location}

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

              alt={restaurant.name}

            />

          ))

        }

      </div>

      <a

        href={`https://wa.me/${restaurant.whatsapp}`}

        target="_blank"

        rel="noopener noreferrer"

        className="floating-whatsapp"

      >

        WhatsApp

      </a>

    </>

  )

}
