import RestaurantCard from '../components/RestaurantCard'
import { restaurants } from '../data/restaurants'
import '../styles/Home.css'

export default function Home() {
  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <h1>
            Descubre restaurantes en Honduras
          </h1>

          <p>
            Menús • Fotos • WhatsApp • Ubicación
          </p>

          <button>
            Ver Restaurantes
          </button>

        </div>

      </section>

      <section className="restaurants">

  <h2>Restaurantes Populares</h2>

  <div className="restaurants-grid">

    {restaurants.map((restaurant) => (

      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
      />

    ))}

  </div>

</section>

    </div>
  )
}