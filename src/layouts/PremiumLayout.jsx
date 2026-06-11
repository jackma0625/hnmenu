
import { useState } from 'react'

import MenuSection
from '../components/MenuSection'

export default function PremiumLayout({

  restaurant,

}) {

  const theme = restaurant.theme

  const [cart, setCart] = useState([])

  const [showCart, setShowCart] = useState(false)

  function addToCart(item) {

    setCart((prev) => {

      const existingItem = prev.find(

        (cartItem) =>

          cartItem.name === item.name

      )

      if (existingItem) {

        return prev.map((cartItem) =>

          cartItem.name === item.name

            ? {

                ...cartItem,

                quantity:

                  cartItem.quantity + 1,

              }

            : cartItem

        )

      }

      return [

        ...prev,

        {

          ...item,

          quantity: 1,

        },

      ]

    })

  }

  function increaseQuantity(name) {

    setCart((prev) =>

      prev.map((item) =>

        item.name === name

          ? {

              ...item,

              quantity: item.quantity + 1,

            }

          : item

      )

    )

  }

  function decreaseQuantity(name) {

    setCart((prev) =>

      prev

        .map((item) =>

          item.name === name

            ? {

                ...item,

                quantity: item.quantity - 1,

              }

            : item

        )

        .filter((item) => item.quantity > 0)

    )

  }

  return (

    <>

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

      {

        cart.length > 0 && (

          <div className="cart-bar">

            <div>

              🛒 {cart.length} productos

            </div>

            <button

              onClick={() =>

                setShowCart(true)

              }

            >

              Ver Pedido

            </button>

          </div>

        )

      }

      {

        showCart && (

          <div className="cart-modal">

            <div className="cart-content">

              <div className="cart-header">

                <h2>

                  Tu Pedido

                </h2>

                <button

                  onClick={() =>

                    setShowCart(false)

                  }

                >

                  ✕

                </button>

              </div>

              <div className="cart-items">

                {

                  cart.map((item, index) => (

                    <div

                      key={index}

                      className="cart-item"

                    >

                      <div>

                        <span>

                          {item.name}

                        </span>

                        <p>

                          x{item.quantity}

                        </p>

                      </div>

                      <div className="cart-controls">

                        <button

                          onClick={() =>

                            decreaseQuantity(item.name)

                          }

                        >

                          −

                        </button>

                        <span>

                          L {

                            item.price *

                            item.quantity

                          }

                        </span>

                        <button

                          onClick={() =>

                            increaseQuantity(item.name)

                          }

                        >

                          +

                        </button>

                      </div>

                    </div>

                  ))

                }

              </div>

              <div className="cart-total">

                Total: L {

                  cart.reduce(

                    (total, item) =>

                      total +

                      item.price *

                      item.quantity,

                    0

                  )

                }

              </div>

              <a

                href={`https://wa.me/${restaurant.whatsapp}`}

                target="_blank"

                className="whatsapp-order"

              >

                Enviar por WhatsApp

              </a>

            </div>

          </div>

        )

      }

    </>

  )

}