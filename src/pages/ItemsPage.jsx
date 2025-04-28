import { useOutletContext } from "react-router-dom";
import ItemList from "../components/item/ItemList";
import { useFetch } from "../hooks/useApi";

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
