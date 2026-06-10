import { Link } from 'react-router-dom'

export default function RestaurantCard({

  restaurant,

}) {

  return (

    <Link
      to="/restaurant"
      className="restaurant-card"
    >

      <img
        src={restaurant.image}
        alt={restaurant.name}
      />

      <div className="restaurant-content">

        <h3>
          {restaurant.name}
        </h3>

        <p className="restaurant-category">

          {restaurant.category}

        </p>

        <div className="restaurant-bottom">

          <span>
            📍 La Entrada
          </span>

          <button>
            WhatsApp
          </button>

        </div>

      </div>

    </Link>

  )
}