
import PremiumMenu
from '../components/restaurant/PremiumMenu'




import RestaurantHeader
from '../components/restaurant/RestaurantHeader'


import CartModal
from '../components/restaurant/CartModal'


import CartBar
from '../components/restaurant/CartBar'


import { useState } from 'react'

import MenuSection
from '../components/restaurant/MenuSection'

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

<a

  href="/"

  className="back-button"

>

  ← Volver

</a>


<RestaurantHeader

  restaurant={restaurant}

  theme={theme}

/>



      

 
<CartBar

  cart={cart}

  setShowCart={setShowCart}

/>



<CartModal

  cart={cart}

  setShowCart={setShowCart}

  decreaseQuantity={decreaseQuantity}

  increaseQuantity={increaseQuantity}

  restaurant={restaurant}

/>


<PremiumMenu

  restaurant={restaurant}

  theme={theme}

  addToCart={addToCart}

/>


      

    </>

  )

}