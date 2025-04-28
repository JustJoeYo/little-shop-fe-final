import { useState, useEffect } from "react";
import { postData, patchData, fetchData } from "../../services/api";
import ReusableForm from "../common/Form";
import ApiErrorMessage from "../common/ApiErrorMessage";
import "../../styles/ItemForm.css";

function ItemForm({
  item,
  onSuccess,
  onCancel,
  showStatus,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit_price: "",
    merchant_id: "",
  });

  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("merchants")
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching merchants:", error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (item && isEditing) {
      setFormData({
        name: item.attributes.name || "",
        description: item.attributes.description || "",
        unit_price: item.attributes.unit_price || "",
        merchant_id: item.attributes.merchant_id || "",
      });
    }
  }, [item, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.unit_price || !formData.merchant_id) {
      setError({ clientMessage: "Name, price, and merchant are required" });
      return;
    }

    setLoading(true);

    const itemData = {
      item: { ...formData },
    };

    const apiRequest = isEditing
      ? patchData(`items/${item.id}`, itemData)
      : postData("items", itemData);

    apiRequest
      .then((response) => {
        onSuccess(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error(
          `Error ${isEditing ? "updating" : "creating"} item:`,
          error
        );
        setError(error);
        showStatus(
          error.serverMessage ||
            `Failed to ${isEditing ? "update" : "create"} item`,
          false
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? "Edit Item" : "Add New Item"}</h3>

      {error &&
        (error.clientMessage ? (
          <div className="error-message">{error.clientMessage}</div>
        ) : (
          <ApiErrorMessage error={error} />
        ))}

      <ReusableForm
        label="Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <ReusableForm
        label="Description"
        id="description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
      />

      <ReusableForm
        label="Price"
        id="unit_price"
        name="unit_price"
        type="number"
        value={formData.unit_price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        required
      />

      <ReusableForm
        label="Merchant"
        id="merchant_id"
        name="merchant_id"
        type="select"
        value={formData.merchant_id}
        onChange={handleChange}
        required
        options={[
          { value: "", label: "Select a Merchant" },
          ...merchants.map((merchant) => ({
            value: merchant.id,
            label: merchant.attributes.name,
          })),
        ]}
      />

      <div className="form-actions">
        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          className="cancel"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
