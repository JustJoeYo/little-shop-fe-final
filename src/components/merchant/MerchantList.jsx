import { useNavigate } from "react-router-dom";
import MerchantItem from "./MerchantItem";

function MerchantList({ merchants, onUpdate, onDelete, showStatus }) {
  const navigate = useNavigate();

  return (
    <div className="merchants-container">
      {merchants.map((merchant) => (
        <MerchantItem
          key={merchant.id}
          merchant={merchant}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onViewCoupons={() => navigate(`/merchants/${merchant.id}/coupons`)}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
}

export default MerchantList;
