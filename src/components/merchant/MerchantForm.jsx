import { useState } from "react";
import { postData } from "../../services/api";
import ApiErrorMessage from "../common/ApiErrorMessage";

function MerchantForm({ onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError({ clientMessage: "Merchant name is required" });
      return;
    }

    const merchantData = {
      merchant: {
        name,
      },
    };

    postData("merchants", merchantData)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error creating merchant:", error);
        setError(error); // Store the error object
      });
  };

  return (
    <form className="merchant-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add New Merchant</h3>

      {error &&
        (error.clientMessage ? (
          <div className="error-message">{error.clientMessage}</div>
        ) : (
          <ApiErrorMessage error={error} />
        ))}

      <div className="form-group">
        <label htmlFor="merchant-name">Merchant Name</label>
        <input
          type="text"
          id="merchant-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="button">
          Add Merchant
        </button>
      </div>
    </form>
  );
}

export default MerchantForm;
