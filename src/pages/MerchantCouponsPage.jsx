import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import CouponList from "../components/coupon/CouponList";
import CouponForm from "../components/coupon/CouponForm";
import { useFetch } from "../hooks/useApi";

function MerchantCouponsPage() {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const { showStatus } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const {
    data: coupons,
    setData: setCoupons,
    loading,
    error,
  } = useFetch(`merchants/${merchantId}/coupons`, showStatus);

  const addCoupon = (newCoupon) => {
    setCoupons([...coupons, newCoupon]);
  };

  const updateCouponStatus = (id, newStatus) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              attributes: { ...coupon.attributes, status: newStatus },
            }
          : coupon
      )
    );
  };

  if (loading) {
    return <div className="loading">Loading coupons...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="display-options">
        <h3>
          Showing: <span>Coupons for Merchant #{merchantId}</span>
        </h3>
        <div className="button-group">
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Merchants
          </button>
          <button
            className="add-new-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add New Coupon"}
          </button>
        </div>
      </div>

      {showForm && (
        <CouponForm
          merchantId={merchantId}
          onSuccess={(coupon) => {
            addCoupon(coupon);
            setShowForm(false);
            showStatus("Coupon created successfully!", true);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <CouponList
        coupons={coupons}
        merchantId={merchantId}
        onStatusChange={updateCouponStatus}
        showStatus={showStatus}
      />
    </div>
  );
}

export default MerchantCouponsPage;
