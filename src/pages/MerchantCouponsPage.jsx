import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useFetch } from "../hooks/useApi";
import CouponList from "../components/coupon/CouponList";
import CouponForm from "../components/coupon/CouponForm";
import ApiErrorMessage from "../components/common/ApiErrorMessage";
import "../styles/MerchantCouponsPage.css";

function MerchantCouponsPage() {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const { showStatus } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  const {
    data: coupons,
    setData: setCoupons,
    loading,
    error,
  } = useFetch(`merchants/${merchantId}/coupons`, showStatus);

  const { data: merchant } = useFetch(`merchants/${merchantId}`, showStatus);

  useEffect(() => {
    if (!coupons) return;

    let result = [...coupons];

    if (searchTerm.trim() !== "") {
      result = result.filter(
        (coupon) =>
          coupon.attributes.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          coupon.attributes.code
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === "active") {
      result = result.filter((coupon) => coupon.attributes.status === "active");
    } else if (statusFilter === "inactive") {
      result = result.filter(
        (coupon) => coupon.attributes.status === "inactive"
      );
    }

    setFilteredCoupons(result);
  }, [coupons, searchTerm, statusFilter]);

  const addCoupon = (coupon) => {
    setCoupons([...coupons, coupon]);
  };

  const updateCouponStatus = (updatedCoupon) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === updatedCoupon.id ? updatedCoupon : coupon
      )
    );
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  if (loading) {
    return <div className="loading">Loading coupons...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-info">
          <h1>
            Coupons for{" "}
            {merchant?.data?.attributes?.name || `Merchant #${merchantId}`}
          </h1>
          <span className="coupon-count">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="header-actions">
          <button
            className="button button-secondary"
            onClick={() => navigate("/merchants")}
          >
            Back to Merchants
          </button>
          <button
            className={`button ${showForm ? "button-secondary" : ""}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add New Coupon"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card form-card">
          <CouponForm
            merchantId={merchantId}
            onSuccess={(coupon) => {
              addCoupon(coupon);
              setShowForm(false);
              showStatus("Coupon created successfully!", true);
            }}
            onCancel={() => setShowForm(false)}
            showStatus={showStatus}
          />
        </div>
      )}

      <div className="card data-card">
        <div className="data-header">
          <h2>Coupon List</h2>
          <div className="data-actions">
            <input
              type="text"
              placeholder="Search coupons..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Coupons</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        <div className="data-content">
          <CouponList
            coupons={filteredCoupons}
            merchantId={merchantId}
            onStatusChange={updateCouponStatus}
            showStatus={showStatus}
          />
          {filteredCoupons.length === 0 && coupons.length > 0 && (
            <div className="no-results">
              No coupons match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MerchantCouponsPage;
