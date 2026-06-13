
import { useState } from 'react'

import { categories }
from '../data/categories.js'

export default function CategorySection({

  selectedCategory,

  setSelectedCategory,

}) {

  const [showMenu, setShowMenu]

    = useState(false)

  return (

    <section className="categories">

      <div className="filter-bar">

        <button

          className="filter-btn"

          onClick={() =>

            setShowMenu(!showMenu)

          }

        >

          {

            selectedCategory === 'all'

              ? 'Todos'

              : categories.find(

                  (category) =>

                    category.slug ===

                    selectedCategory

                )?.name

          } ▼

        </button>

      </div>

      {

        showMenu && (

          <div className="dropdown-menu">

            <button

              className={

                selectedCategory === 'all'

                  ? 'active-dropdown'

                  : ''

              }

              onClick={() => {

                setSelectedCategory('all')

                setShowMenu(false)

              }}

            >

              Todos

            </button>

            {

              categories.map((category) => (

                <button

                  key={category.id}

                  className={

                    selectedCategory ===

                    category.slug

                      ? 'active-dropdown'

                      : ''

                  }

                  onClick={() => {

                    setSelectedCategory(

                      category.slug

                    )

                    setShowMenu(false)

                  }}

                >

                  {category.icon}

                  {' '}

                  {category.name}

                </button>

              ))

            }

          </div>

        )

      }

    </section>

  )

}
