import { deleteData } from "../../services/api";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa";
import "../../styles/MerchantList.css";

function MerchantList({ merchants, onUpdate, onDelete, showStatus }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      deleteData(`merchants/${id}`)
        .then(() => {
          onDelete(id);
          showStatus("Merchant deleted successfully!", true);
        })
        .catch((error) => {
          console.error("Error deleting merchant:", error);
          showStatus("Failed to delete merchant!", false);
        });
    }
  };

  if (!merchants || merchants.length === 0) {
    return <div className="empty-state">No merchants found</div>;
  }

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
            <button
              className="button button-danger btn-sm"
              onClick={() => handleDelete(merchant.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MerchantList;
