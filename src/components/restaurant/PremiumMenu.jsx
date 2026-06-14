
// components/restaurant/PremiumMenu.jsx

import { useState } from 'react'

export default function PremiumMenu({

  restaurant,

  theme,

  addToCart

}) {

  const [activeCategory,

    setActiveCategory]

    = useState(

      restaurant.menu[0]?.category

    )

  const [addingItem,

    setAddingItem]

    = useState(null)

  const filteredMenu =

    restaurant.menu.filter(

      (section) =>

        section.category ===

        activeCategory

    )

  const handleAddToCart =

    (item) => {

      setAddingItem(item.name)

      addToCart(item)

      setTimeout(() =>

        setAddingItem(null),

        300

      )

    }

  return (

    <div className="restaurant-menu">

      {/* 分类导航 */}

      <div className="premium-categories">

        {

          restaurant.menu.map(

            (section) => (

              <button

                key={section.category}

                className={

                  activeCategory ===

                  section.category

                    ? 'active-category'

                    : ''

                }

                onClick={() =>

                  setActiveCategory(

                    section.category

                  )

                }

              >

                {section.category}

              </button>

            )

          )

        }

      </div>

      {/* 菜单内容 */}

      {

        filteredMenu.map((section) => (

          <div

            key={section.category}

            className="menu-section"

          >

            <h2>

              {section.category}

            </h2>

            <div className="menu-items">

              {

                section.items.map(

                  (item, index) => (

                    <div

                      key={index}

                      className="menu-item"

                    >

                      <div className="menu-left">

                        <h3>

                          {item.name}

                        </h3>

                        {

                          item.description && (

                            <p className="item-description">

                              {item.description}

                            </p>

                          )

                        }

                      </div>

                      <div className="menu-right">

                        <span className="item-price">

                          L. {item.price}

                        </span>

                        <button

                          className={`add-to-cart-btn ${

                            addingItem === item.name

                              ? 'adding'

                              : ''

                          }`}

                          onClick={() =>

                            handleAddToCart(item)

                          }

                        >

                          {

                            addingItem === item.name

                              ? '✓'

                              : '+'

                          }

                        </button>

                      </div>

                    </div>

                  )

                )

              }

            </div>

          </div>

        ))

      }

    </div>

  )

}
