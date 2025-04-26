import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import CouponList from "../components/coupon/CouponList";
import CouponForm from "../components/coupon/CouponForm";
import { fetchData } from "../services/api";

function MerchantCouponsPage() {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const { showStatus } = useOutletContext();

  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData(`merchants/${merchantId}/coupons`)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        showStatus("Failed to load coupons", false);
      });
  }, [merchantId]);

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

  return (
    <div>
      <div className="display-options">
        <h3>
          <span>Coupons for Merchant #{merchantId}</span>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Merchants
          </button>
        </h3>
        <button
          className="add-new-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Coupon"}
        </button>
      </div>

      {showForm && (
        <CouponForm
          merchantId={merchantId}
          onSuccess={(coupon) => {
            addCoupon(coupon);
            setShowForm(false);
            showStatus("Success! Coupon added!", true);
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
