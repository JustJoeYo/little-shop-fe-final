import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ItemList from "../components/item/ItemList";
import ItemForm from "../components/item/ItemForm";
import { useFetch } from "../hooks/useApi";
import ApiErrorMessage from "../components/common/ApiErrorMessage";
import "../styles/ItemsPage.css";

function ItemsPage() {
  const { showStatus } = useOutletContext();
  const {
    data: items,
    setData: setItems,
    loading,
    error,
  } = useFetch("items", showStatus);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!items) return;

    let result = [...items];

    if (searchTerm.trim() !== "") {
      result = result.filter(
        (item) =>
          item.attributes.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.attributes.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterValue === "low-to-high") {
      result.sort(
        (a, b) =>
          parseFloat(a.attributes.unit_price) -
          parseFloat(b.attributes.unit_price)
      );
    } else if (filterValue === "high-to-low") {
      result.sort(
        (a, b) =>
          parseFloat(b.attributes.unit_price) -
          parseFloat(a.attributes.unit_price)
      );
    }

    setFilteredItems(result);
  }, [items, searchTerm, filterValue]);

  const addItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
    setShowForm(false);
    showStatus("Item added successfully!", true);
  };

  const updateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    showStatus("Item updated successfully!", true);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showStatus("Item deleted successfully!", true);
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Item Management</h1>
        <button
          className={`button ${showForm ? "button-secondary" : ""}`}
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
          }}
        >
          {showForm ? "Cancel" : "+ Add New Item"}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <ItemForm
            onSuccess={addItem}
            onCancel={() => setShowForm(false)}
            showStatus={showStatus}
          />
        </div>
      )}

      {editingItem && (
        <div className="card form-card">
          <ItemForm
            item={editingItem}
            onSuccess={updateItem}
            onCancel={() => setEditingItem(null)}
            showStatus={showStatus}
            isEditing={true}
          />
        </div>
      )}

      {apiError && <ApiErrorMessage error={apiError} />}

      <div className="card data-card">
        <div className="data-header">
          <h2>Item List</h2>
          <div className="data-actions">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="data-content">
          <ItemList
            items={filteredItems}
            onEdit={setEditingItem}
            onDelete={deleteItem}
            showStatus={showStatus}
            setApiError={setApiError}
          />
          {filteredItems.length === 0 && items.length > 0 && (
            <div className="no-results">
              No items match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
