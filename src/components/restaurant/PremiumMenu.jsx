
import { useState }
from 'react'

import MenuSection
from './MenuSection'

export default function PremiumMenu({

  restaurant,

  theme,

  addToCart,

}) {

  const [selectedCategory,

    setSelectedCategory]

    = useState(

      restaurant.menu[0]?.category

    )

  const filteredMenu =

    restaurant.menu.filter(

      (section) =>

        section.category ===

        selectedCategory

    )

  return (

    <>

      <div className="premium-categories">

        {

          restaurant.menu.map((section) => (

            <button

              key={section.category}

              className={

                selectedCategory ===

                section.category

                  ? 'active-category'

                  : ''

              }

              onClick={() =>

                setSelectedCategory(

                  section.category

                )

              }

            >

              {section.category}

            </button>

          ))

        }

      </div>

      <div className="restaurant-menu">

        {

          filteredMenu.map((section) => (

            <MenuSection

              key={section.category}

              section={section}

              addToCart={addToCart}

              theme={theme}

            />

          ))

        }

      </div>

    </>

  )

}
