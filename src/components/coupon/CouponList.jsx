import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { patchData } from "../../services/api";
import "../../styles/CouponList.css";
import ApiErrorMessage from "../common/ApiErrorMessage";

function CouponList({ coupons, merchantId, onStatusChange, showStatus }) {
  const [error, setError] = useState(null);

  if (!coupons || coupons.length === 0) {
    return (
      <div className="empty-state">No coupons found for this merchant</div>
    );
  }

  const handleStatusToggle = (e, coupon) => {
    e.preventDefault();
    e.stopPropagation();

    const newStatus =
      coupon.attributes.status === "active" ? "inactive" : "active";
    const statusMessage = newStatus === "active" ? "activated" : "deactivated";

    patchData(`merchants/${merchantId}/coupons/${coupon.id}`, {
      status: newStatus,
    })
      .then((response) => {
        onStatusChange(response.data);
        showStatus(`Coupon ${statusMessage} successfully!`, true);
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
                onClick={(e) => handleStatusToggle(e, coupon)}
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
              <span className="discount-value">{formatDiscount(coupon)}</span>
            </div>

            <div className="coupon-footer">
              <div className="coupon-stats">
                <div className="usage-stats">
                  <div className="usage-stat">
                    <span className="stat-label">Total Uses:</span>
                    <span className="stat-value">
                      {coupon.attributes.count_successful_uses || 0}
                    </span>
                  </div>

                  {coupon.attributes.status === "active" && (
                    <div className="usage-stat">
                      <span className="stat-label">Status:</span>
                      <span className="stat-value active-status">Active</span>
                    </div>
                  )}

                  {coupon.attributes.status === "inactive" && (
                    <div className="usage-stat">
                      <span className="stat-label">Status:</span>
                      <span className="stat-value inactive-status">
                        Inactive
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CouponList;
