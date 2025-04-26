import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MerchantList from "../components/merchant/MerchantList";
import MerchantForm from "../components/merchant/MerchantForm";
import { fetchData } from "../services/api";

function MerchantsPage() {
  const [merchants, setMerchants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { showStatus } = useOutletContext();

  useEffect(() => {
    fetchData("merchants")
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching merchants:", error);
        showStatus("Failed to load merchants", false);
      });
  }, []);

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
            showStatus("Success! Merchant added!", true);
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
