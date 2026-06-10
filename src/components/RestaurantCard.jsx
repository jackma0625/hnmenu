export default function RestaurantCard({ restaurant }) {

    return (
  
      <div className="restaurant-card">
  
        <img
          src={restaurant.image}
          alt={restaurant.name}
        />
  
        <div className="restaurant-info">
  
          <h3>{restaurant.name}</h3>
  
          <p>{restaurant.category}</p>
  
        </div>
  
      </div>
  
    )
  }