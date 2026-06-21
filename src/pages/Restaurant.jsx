import CustomLayout from '../layouts/CustomLayout'
import PremiumLayout from '../layouts/PremiumLayout'
import BasicLayout from '../layouts/BasicLayout'
import { useParams } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import '../styles/Home.css'

export default function Restaurant() {
  const { slug } = useParams()

 

const restaurant =
  restaurants.find(
    r => r.slug === slug
  )

  if (!restaurant) {
    return (
      <div style={{ padding: '40px' }}>
        Restaurant not found
      </div>
    )
  }

  return (
    <div
      className="restaurant-page"
      style={{
        background: restaurant.theme?.colors?.background,
      }}
    >
      {restaurant.template === 'basic' && (
        <BasicLayout restaurant={restaurant} />
      )}

      {restaurant.template === 'premium' && (
        <PremiumLayout restaurant={restaurant} />
      )}

      {restaurant.template === 'custom' && (
        <CustomLayout restaurant={restaurant} />
      )}
    </div>
  )
}