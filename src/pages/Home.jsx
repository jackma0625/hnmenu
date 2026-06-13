
import { filterRestaurants } from '../utils/filterRestaurants'
import { useState } from 'react'
import CategorySection from '../components/CategorySection'
import Navbar from '../components/Navbar'
import RestaurantCard from '../components/RestaurantCard'
import { restaurants } from '../data/restaurants'
import '../styles/Home.css'

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('all')
  const filteredRestaurants = filterRestaurants( restaurants, selectedCategory )
      return (
        <>

<Navbar />

      

      <CategorySection
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>

      <section className="restaurants">

  

  <div className="restaurants-grid">

  {filteredRestaurants.map((restaurant) => (

      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
      />

    ))}

  </div>

</section>

</>
  )
}