import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MerchantList from "../components/merchant/MerchantList";
import MerchantForm from "../components/merchant/MerchantForm";
import { useFetch } from "../hooks/useApi";
import "../styles/MerchantsPage.css";

function MerchantsPage() {
  const [showForm, setShowForm] = useState(false);
  const { showStatus } = useOutletContext();

  const {
    data: merchants,
    setData: setMerchants,
    loading,
    error,
  } = useFetch("merchants", showStatus);

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
            />
            <select className="filter-select">
              <option>All Merchants</option>
              <option>With Coupons</option>
              <option>Without Coupons</option>
            </select>
          </div>
        </div>

        <MerchantList
          merchants={merchants}
          onUpdate={updateMerchant}
          onDelete={removeMerchant}
          showStatus={showStatus}
        />
      </div>
    </div>
  );
}

export default MerchantsPage;
