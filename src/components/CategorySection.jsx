import { useState } from 'react'

export default function CategorySection({

  selectedCategory,
  setSelectedCategory,

}) {

  const [showMenu, setShowMenu] = useState(false)

  const categories = [

    'Todos',

    'Comida Asia',

    'Cafetería',

    'Pizza y Hamburguesa',

    'Baleadas',

    'Pollo Frito y Asado',

  ]

  return (

    <section className="categories">

      <div className="filter-bar">

        <button
          className="filter-btn"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >

          {selectedCategory} ▼

        </button>

      </div>

      {

        showMenu && (

          <div className="dropdown-menu">

            {

              categories.map((category) => (

                <button

                  key={category}

                  className={
                    selectedCategory === category
                      ? 'active-dropdown'
                      : ''
                  }

                  onClick={() => {

                    setSelectedCategory(category)

                    setShowMenu(false)

                  }}

                >

                  {category}

                </button>

              ))

            }

          </div>

        )

      }

    </section>

  )
}