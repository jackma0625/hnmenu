
export function buildWhatsAppMessage(

  cart

) {

  const items = cart.map(

    (item) =>

      `${item.quantity}x ${item.name}`

  )

  return encodeURIComponent(

    `Hola, quiero ordenar:\n\n${items.join('\n')}`

  )

}
