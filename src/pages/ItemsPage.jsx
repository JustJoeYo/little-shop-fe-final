import { useOutletContext } from "react-router-dom";
import ItemList from "../components/item/ItemList";
import { useFetch } from "../hooks/useApi";
import "../styles/ItemsPage.css";

function ItemsPage() {
  const { showStatus } = useOutletContext();
  const { data: items, loading, error } = useFetch("items", showStatus);

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
      </div>

      <div className="card data-card">
        <div className="data-header">
          <h2>Item List</h2>
          <div className="data-actions">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
            />
            <select className="filter-select">
              <option>All Items</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="data-content">
          <ItemList items={items} />
          {items.length === 0 && (
            <div className="no-results">No items found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
