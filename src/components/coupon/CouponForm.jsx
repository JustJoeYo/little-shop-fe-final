import { useState } from "react";
import { postData } from "../../services/api";
import ReusableForm from "../common/Form";

function CouponForm({ merchantId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount_type: "percent",
    discount_amount: "",
    status: "active",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.code || !formData.discount_amount) {
      setError("Please fill out all required fields");
      return;
    }

    const couponData = {
      coupon: { ...formData },
    };

    postData(`merchants/${merchantId}/coupons`, couponData)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error creating coupon:", error);
        setError("Failed to create coupon. Please try again.");
      });
  };

  return (
    <form className="coupon-form" onSubmit={handleSubmit}>
      <h3>Add New Coupon</h3>

      {error && <div className="error-message">{error}</div>}

      <ReusableForm
        label="Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <ReusableForm
        label="Code"
        id="code"
        name="code"
        value={formData.code}
        onChange={handleChange}
        required
      />

      <ReusableForm
        label="Discount Type"
        id="discount_type"
        name="discount_type"
        type="select"
        value={formData.discount_type}
        onChange={handleChange}
        options={[
          { value: "percent", label: "Percent Off" },
          { value: "dollar", label: "Dollar Off" },
        ]}
        required
      />

      <ReusableForm
        label="Discount Amount"
        id="discount_amount"
        name="discount_amount"
        type="number"
        value={formData.discount_amount}
        onChange={handleChange}
        min="1"
        step="0.01"
        required
      />

      <div className="form-actions">
        <button type="submit" className="submit">
          Submit
        </button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CouponForm;
