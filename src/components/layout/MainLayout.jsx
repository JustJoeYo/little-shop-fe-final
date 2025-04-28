import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import StatusMessage from "../common/StatusMessage";

function MainLayout() {
  const [status, setStatus] = useState({
    message: "",
    isSuccess: true,
    show: false,
    key: 0,
  });

  const showStatus = (message, isSuccess = true) => {
    setStatus((prev) => ({
      message,
      isSuccess,
      show: true,
      key: prev.key + 1, // Increment key to force re-render
    }));
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main>
        <StatusMessage
          key={status.key}
          message={status.message}
          isSuccess={status.isSuccess}
          show={status.show}
        />
        <Outlet context={{ showStatus }} />
      </main>
    </div>
  );
}

export default MainLayout;
