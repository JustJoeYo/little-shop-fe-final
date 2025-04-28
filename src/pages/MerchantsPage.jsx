import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MerchantList from "../components/merchant/MerchantList";
import MerchantForm from "../components/merchant/MerchantForm";
import { useFetch } from "../hooks/useApi";

function MerchantsPage() {
  const [showForm, setShowForm] = useState(false);
  const { showStatus } = useOutletContext();

  const {
    data: merchants,
    setData: setMerchants,
    loading,
    error,
  } = useFetch("merchants", showStatus);

  if (loading) {
    return <div className="loading">Loading merchants...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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

  return (
    <div>
      <div className="display-options">
        <h3>
          Showing: <span>All Merchants</span>
        </h3>
        <button
          className="add-new-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add New Merchant"}
        </button>
      </div>

      {showForm && (
        <MerchantForm
          onSuccess={(merchant) => {
            addMerchant(merchant);
            setShowForm(false);
            showStatus("Merchant added successfully!", true);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <MerchantList
        merchants={merchants}
        onUpdate={updateMerchant}
        onDelete={removeMerchant}
        showStatus={showStatus}
      />
    </div>
  );
}

export default MerchantsPage;
