import { useState } from "react";
import { patchData } from "../../services/api";

function CouponItem({ coupon, merchantId, onStatusChange, showStatus }) {
  const [isLoading, setIsLoading] = useState(false);

  const formatDiscount = () => {
    const { discount_type, discount_amount } = coupon.attributes;
    return discount_type === "percent"
      ? `${discount_amount}%`
      : `$${discount_amount}`;
  };

  const toggleStatus = () => {
    setIsLoading(true);

    const currentStatus = coupon.attributes.status;
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    const couponData = {
      coupon: {
        status: newStatus,
      },
    };

    patchData(`merchants/${merchantId}/coupons/${coupon.id}`, couponData)
      .then((response) => {
        onStatusChange(coupon.id, newStatus);
        showStatus(
          `Coupon ${
            newStatus === "active" ? "activated" : "deactivated"
          } successfully!`,
          true
        );
      })
      .catch((error) => {
        console.error("Error updating coupon status:", error);
        showStatus("Failed to update coupon status!", false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <article className="coupon" id={`coupon-${coupon.id}`}>
      <h3 className="coupon-name">{coupon.attributes.name}</h3>
      <div className="coupon-details">
        <p className="coupon-code">Code: {coupon.attributes.code}</p>
        <p className="coupon-discount">Discount: {formatDiscount()}</p>
        <p className="coupon-status">Status: {coupon.attributes.status}</p>
        <p className="coupon-usage">
          Times Used: {coupon.attributes.used_count || 0}
        </p>
      </div>
      <div className="coupon-options">
        <button
          className="toggle-coupon-status"
          onClick={toggleStatus}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : coupon.attributes.status === "active"
            ? "Deactivate"
            : "Activate"}
        </button>
      </div>
    </article>
  );
}

export default CouponItem;
