import CouponItem from "./CouponItem";

function CouponList({ coupons, merchantId, onStatusChange, showStatus }) {
  if (coupons.length === 0) {
    return (
      <p className="no-coupons-message">No coupons found for this merchant.</p>
    );
  }

  return (
    <div className="coupons-container">
      {coupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          merchantId={merchantId}
          onStatusChange={onStatusChange}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
}

export default CouponList;
