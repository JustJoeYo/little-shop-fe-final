import { useState } from "react";
import { postData } from "../../services/api";

function MerchantForm({ onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Merchant name is required");
      return;
    }

    const merchantData = {
      name: name,
    };

    postData("merchants", merchantData)
      .then((response) => {
        onSuccess(response.data);
        setName("");
        setError("");
      })
      .catch((error) => {
        console.error("Error creating merchant:", error);
        setError("Failed to create merchant. Please try again.");
      });
  };

  return (
    <form className="merchant-form" onSubmit={handleSubmit}>
      <h3>Add New Merchant</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="merchant-name">Merchant Name:</label>
        <input
          type="text"
          id="merchant-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit">
          Add Merchant
        </button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MerchantForm;
