import { useState } from "react";
import { patchData, deleteData } from "../../services/api";

function MerchantItem({
  merchant,
  onUpdate,
  onDelete,
  onViewCoupons,
  showStatus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(merchant.attributes.name);

  const handleUpdate = () => {
    const updatedData = {
      name: name,
    };

    patchData(`merchants/${merchant.id}`, updatedData)
      .then((response) => {
        onUpdate(response.data);
        setIsEditing(false);
        showStatus("Merchant updated successfully!", true);
      })
      .catch((error) => {
        console.error("Error updating merchant:", error);
        showStatus("Failed to update merchant!", false);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      deleteData(`merchants/${merchant.id}`)
        .then(() => {
          onDelete(merchant.id);
          showStatus("Merchant deleted successfully!", true);
        })
        .catch((error) => {
          console.error("Error deleting merchant:", error);
          showStatus("Failed to delete merchant!", false);
        });
    }
  };

  return (
    <article className="merchant" id={`merchant-${merchant.id}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="edit-options">
            <button onClick={handleUpdate} className="update">
              Update
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{merchant.attributes.name}</h3>
          <div className="merchant-options">
            <button className="edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="view-coupons" onClick={onViewCoupons}>
              View Coupons
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default MerchantItem;
