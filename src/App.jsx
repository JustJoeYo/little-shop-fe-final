import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MerchantsPage from "./pages/MerchantsPage";
import ItemsPage from "./pages/ItemsPage";
import MerchantCouponsPage from "./pages/MerchantCouponsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MerchantsPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route
            path="merchants/:merchantId/coupons"
            element={<MerchantCouponsPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
