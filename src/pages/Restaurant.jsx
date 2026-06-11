
import { useParams } from 'react-router-dom'
import { restaurants } from '../data/restaurants'

import PremiumLayout
from '../layouts/PremiumLayout'

import '../styles/Home.css'

export default function Restaurant() {
  const { id } = useParams()
  const restaurant = restaurants.find(
    (r) => r.id === Number(id)
  )

  

  return (
<div
  className="restaurant-page"
  style={{
    background:
      restaurant.theme?.colors?.background,
  }}
>

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


{

  restaurant.template === 'premium' && (

    <PremiumLayout

      restaurant={restaurant}

    />

  )

}

    </div>
  )
}
