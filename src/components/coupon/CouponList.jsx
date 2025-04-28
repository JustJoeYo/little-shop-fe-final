import { useState } from "react";
import {
  FaToggleOn,
  FaToggleOff,
  FaEdit,
  FaTrash,
  FaPercent,
  FaDollarSign,
} from "react-icons/fa";
import { patchData, deleteData } from "../../services/api";
import "../../styles/CouponList.css";
import ApiErrorMessage from "../common/ApiErrorMessage";

function CouponList({
  coupons,
  merchantId,
  onStatusChange,
  onDelete,
  showStatus,
}) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [error, setError] = useState(null);

  if (!coupons || coupons.length === 0) {
    return (
      <div className="empty-state">No coupons found for this merchant</div>
    );
  }

  const handleStatusToggle = (coupon) => {
    const newStatus =
      coupon.attributes.status === "active" ? "inactive" : "active";

    patchData(`merchants/${merchantId}/coupons/${coupon.id}`, {
      status: newStatus,
    })
      .then((response) => {
        onStatusChange(response.data);
        showStatus(
          `Coupon ${
            newStatus === "active" ? "activated" : "deactivated"
          } successfully!`,
          true
        );
      })
      .catch((error) => {
        console.error("Error updating coupon status:", error);
        setError(error);
        showStatus(
          error.serverMessage || "Failed to update coupon status",
          false
        );
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

  const handleDelete = (id) => {
    deleteData(`merchants/${merchantId}/coupons/${id}`)
      .then(() => {
        onDelete(id);
        setDeleteConfirmId(null);
        showStatus("Coupon deleted successfully!", true);
      })
      .catch((error) => {
        console.error("Error deleting coupon:", error);
        setError(error);
        showStatus(error.serverMessage || "Failed to delete coupon", false);
      });
  };

  const formatDiscount = (coupon) => {
    const amount = parseFloat(coupon.attributes.discount_amount);
    if (coupon.attributes.discount_type === "percent") {
      return `${amount}% off`;
    } else {
      return `$${amount.toFixed(2)} off`;
    }
  };

  return (
    <>
      {error && <ApiErrorMessage error={error} />}

      <div className="coupon-grid">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`coupon-card ${
              coupon.attributes.status === "active" ? "active" : "inactive"
            }`}
          >
            <div className="coupon-header">
              <h3 className="coupon-name">{coupon.attributes.name}</h3>
              <div
                className="coupon-status"
                onClick={() => handleStatusToggle(coupon)}
              >
                {coupon.attributes.status === "active" ? (
                  <FaToggleOn
                    className="status-icon active"
                    title="Active - Click to deactivate"
                  />
                ) : (
                  <FaToggleOff
                    className="status-icon inactive"
                    title="Inactive - Click to activate"
                  />
                )}
              </div>
            </div>

            <div className="coupon-code">
              <span className="code-label">CODE:</span>
              <span className="code-value">{coupon.attributes.code}</span>
            </div>

            <div className="coupon-discount">
              <span className="discount-icon">
                {coupon.attributes.discount_type === "percent" ? (
                  <FaPercent />
                ) : (
                  <FaDollarSign />
                )}
              </span>
              <span className="discount-value">{formatDiscount(coupon)}</span>
            </div>

            <div className="coupon-footer">
              <div className="coupon-stats">
                <span>
                  Uses: {coupon.attributes.count_successful_uses || 0}
                </span>
              </div>

              <div className="coupon-actions">
                {deleteConfirmId === coupon.id ? (
                  <div className="delete-confirm">
                    <span className="confirm-text">Delete?</span>
                    <button
                      className="button button-danger btn-sm"
                      onClick={() => handleDelete(coupon.id)}
                    >
                      Yes
                    </button>
                    <button className="button btn-sm" onClick={cancelDelete}>
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button className="button btn-sm">
                      <FaEdit />
                    </button>
                    <button
                      className="button button-danger btn-sm"
                      onClick={(e) => confirmDelete(e, coupon.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CouponList;
