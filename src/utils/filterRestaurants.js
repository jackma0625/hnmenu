
export function filterRestaurants(

  restaurants,

  selectedCategory

) {

  if (selectedCategory === 'all') {

    return restaurants

  }

  return restaurants.filter(

    (restaurant) =>

      restaurant.category.slug ===

      selectedCategory

  )

}
