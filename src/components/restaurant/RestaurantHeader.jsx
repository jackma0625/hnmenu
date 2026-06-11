
export default function RestaurantHeader({

  restaurant,

  theme,

}) {

  return (

    <div

      className="restaurant-header"

      style={{

        color: theme?.colors?.primary,

      }}

    >

      <h1

        style={{

          color: theme?.colors?.primary,

          fontFamily:

            theme?.fonts?.heading,

        }}

      >

        {restaurant.name}

      </h1>

    </div>

  )

}
