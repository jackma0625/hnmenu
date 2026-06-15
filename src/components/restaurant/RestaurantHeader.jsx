export default function RestaurantHeader({ restaurant }) {
  return (
    <div className="restaurant-header" style={{
      padding: '20px 20px 10px 20px',
      background: '#f5f1ea',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: '700',
        margin: 0,
        color: '#000',
      }}>
        {restaurant.name}
      </h1>
    </div>
  );
}