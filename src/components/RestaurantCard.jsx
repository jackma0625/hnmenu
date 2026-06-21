import { Link } from 'react-router-dom'
export default function RestaurantCard({ restaurant }) {
const cardContent = (
  <>
    <img
      src={restaurant.image}
      alt=""
    />

    <div className="restaurant-content">
      <div>

        <h3>
          {restaurant.name}
        </h3>

        <p className="restaurant-category">
        {restaurant.category.name}
        </p>
        
      </div>

      <div className="restaurant-bottom">
        <span>
          📍 {restaurant.location}
        </span>


<button>
  {
    restaurant.template === 'custom'
      ? 'Ver Sitio'
      : 'Ver Menu'
  }
</button>

      </div>
    </div>
  </>
)


 
return (
  restaurant.template === 'custom'
    ? (
      <a
        href={restaurant.website}
        target="_blank"
        className="restaurant-card"
      >
        {cardContent}
      </a>
    )
    : (

      <Link
        to={`/restaurant/${restaurant.slug}`}
        className="restaurant-card"
      >
        {cardContent}
      </Link>
    )
)
}
