import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchData } from "../services/api";
import ItemList from "../components/item/ItemList";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showStatus } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    fetchData("items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError("Failed to load items. Please try again later.");
        setLoading(false);
        showStatus("Error loading items!", false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="display-options">
        <h3>
          Showing: <span>All Items</span>
        </h3>
      </div>
      <ItemList items={items} />
    </div>
  );
}

export default ItemsPage;
