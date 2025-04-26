function ItemList({ items }) {
  if (items.length === 0) {
    return <p className="no-items-message">No items found.</p>;
  }

  return (
    <div className="items-container">
      {items.map((item) => (
        <article key={item.id} className="item" id={`item-${item.id}`}>
          <h3>{item.attributes.name}</h3>
          <div className="item-details">
            <p>Description: {item.attributes.description}</p>
            <p>Unit Price: ${item.attributes.unit_price}</p>
            <p>Merchant ID: {item.attributes.merchant_id}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ItemList;
