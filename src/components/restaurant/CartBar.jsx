
export default function CartBar({

  cart,

  setShowCart,

}) {


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
}