
import MenuSection
from './MenuSection'

export default function PremiumMenu({

  restaurant,

  theme,

  addToCart,

}) {

  return (

    <div className="restaurant-menu">

      {

        restaurant.menu.map((section) => (

          <MenuSection

            key={section.category}

            section={section}

            addToCart={addToCart}

            theme={theme}

          />

        ))

      }

    </div>

  )

}
