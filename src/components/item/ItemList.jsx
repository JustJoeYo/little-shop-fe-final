import { FaStore } from "react-icons/fa";
import "../../styles/ItemList.css";

function ItemList({ items }) {
  if (items.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <div className="item-grid">
      {items.map((item) => (
        <div key={item.id} className="item-card" id={`item-${item.id}`}>
          <div className="item-header">
            <h3 className="item-name">{item.attributes.name}</h3>
            <div className="item-price">
              ${formatPrice(item.attributes.unit_price)}
            </div>
          </div>

          <div className="item-description">{item.attributes.description}</div>

          <div className="item-footer">
            <div className="item-merchant">
              <FaStore className="merchant-icon" />
              <span>Merchant ID: {item.attributes.merchant_id}</span>
            </div>
            <div className="item-actions">
              <button className="button btn-sm">Edit</button>
              <button className="button button-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
