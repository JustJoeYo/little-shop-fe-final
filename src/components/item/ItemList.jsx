import { useState } from "react";
import { FaStore } from "react-icons/fa";
import { deleteData } from "../../services/api";
import "../../styles/ItemList.css";

function ItemList({ items, onEdit, onDelete, showStatus, setApiError }) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  if (items.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleDelete = (id) => {
    deleteData(`items/${id}`)
      .then(() => {
        onDelete(id);
        setDeleteConfirmId(null);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setApiError(error);
        showStatus(error.serverMessage || "Failed to delete item", false);
      });
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirmId(null);
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
              <button className="button btn-sm" onClick={() => onEdit(item)}>
                Edit
              </button>

              {deleteConfirmId === item.id ? (
                <div className="delete-confirm">
                  <span className="confirm-text">Delete?</span>
                  <button
                    className="button button-danger btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                  >
                    Yes
                  </button>
                  <button className="button btn-sm" onClick={cancelDelete}>
                    No
                  </button>
                </div>
              ) : (
                <button
                  className="button button-danger btn-sm"
                  onClick={(e) => confirmDelete(e, item.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
