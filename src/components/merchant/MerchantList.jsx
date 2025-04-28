import { deleteData } from "../../services/api";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa";
import "../../styles/MerchantList.css";
import { useState } from "react";

function MerchantList({ merchants, onUpdate, onDelete, showStatus }) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteData(`merchants/${id}`)
      .then(() => {
        onDelete(id);
        showStatus("Merchant deleted successfully!", true);
        setDeleteConfirmId(null);
      })
      .catch((error) => {
        console.error("Error deleting merchant:", error);
        showStatus("Failed to delete merchant!", false);
        setDeleteConfirmId(null);
      });
  };

  const confirmDelete = (e, id) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const cancelDelete = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation();
    setDeleteConfirmId(null);
  };

  return (
    <div className="merchant-list">
      {merchants.map((merchant) => (
        <div className="merchant-item" key={merchant.id}>
          <div className="merchant-info">
            <div className="merchant-name">{merchant.attributes.name}</div>
            <div className="merchant-meta">
              <div className="merchant-stat">
                <span className="stat-icon">
                  <FaTag />
                </span>
                <span>{merchant.attributes.coupons_count} coupons</span>
              </div>
              <div className="merchant-stat">
                <span>
                  {merchant.attributes.invoice_coupon_count} invoices with
                  coupons
                </span>
              </div>
            </div>
          </div>

          <div className="merchant-actions">
            <Link
              to={`/merchants/${merchant.id}/coupons`}
              className="button button-secondary btn-sm"
            >
              Manage Coupons
            </Link>
            <button
              className="button btn-sm"
              onClick={() => console.log("Edit", merchant.id)}
            >
              <FaEdit />
            </button>

            {deleteConfirmId === merchant.id ? (
              <div className="delete-confirm">
                <span className="confirm-text">Delete?</span>
                <button
                  className="button button-danger btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(merchant.id);
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
                onClick={(e) => confirmDelete(e, merchant.id)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MerchantList;
