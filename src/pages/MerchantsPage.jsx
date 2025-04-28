import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MerchantList from "../components/merchant/MerchantList";
import MerchantForm from "../components/merchant/MerchantForm";
import { useFetch } from "../hooks/useApi";
import "../styles/MerchantsPage.css";

function MerchantsPage() {
  const [showForm, setShowForm] = useState(false);
  const { showStatus } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [couponFilter, setCouponFilter] = useState("all");
  const [filteredMerchants, setFilteredMerchants] = useState([]);

  const {
    data: merchants,
    setData: setMerchants,
    loading,
    error,
  } = useFetch("merchants", showStatus);

  useEffect(() => {
    if (!merchants) return;

    let result = [...merchants];

    if (searchTerm.trim() !== "") {
      result = result.filter((merchant) =>
        merchant.attributes.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Apply coupon filter
    if (couponFilter === "with") {
      result = result.filter(
        (merchant) => merchant.attributes.coupons_count > 0
      );
    } else if (couponFilter === "without") {
      result = result.filter(
        (merchant) => merchant.attributes.coupons_count === 0
      );
    }

    setFilteredMerchants(result);
  }, [merchants, searchTerm, couponFilter]);

  const addMerchant = (newMerchant) => {
    setMerchants([...merchants, newMerchant]);
  };

  const updateMerchant = (updatedMerchant) => {
    setMerchants(
      merchants.map((merchant) =>
        merchant.id === updatedMerchant.id ? updatedMerchant : merchant
      )
    );
  };

  const removeMerchant = (id) => {
    setMerchants(merchants.filter((merchant) => merchant.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setCouponFilter(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading merchants...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Merchant Management</h1>
        <button
          className={`button ${showForm ? "button-secondary" : ""}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Merchant"}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <MerchantForm
            onSuccess={(merchant) => {
              addMerchant(merchant);
              setShowForm(false);
              showStatus("Merchant added successfully!", true);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="card data-card">
        <div className="data-header">
          <h2>Merchant List</h2>
          <div className="data-actions">
            <input
              type="text"
              placeholder="Search merchants..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="filter-select"
              value={couponFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Merchants</option>
              <option value="with">With Coupons</option>
              <option value="without">Without Coupons</option>
            </select>
          </div>
        </div>

        <div className="data-content">
          <MerchantList
            merchants={filteredMerchants}
            onUpdate={updateMerchant}
            onDelete={removeMerchant}
            showStatus={showStatus}
          />
          {filteredMerchants.length === 0 && merchants.length > 0 && (
            <div className="no-results">
              No merchants match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MerchantsPage;
