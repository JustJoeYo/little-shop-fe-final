import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import StatusMessage from "../common/StatusMessage";

function MainLayout() {
  const [status, setStatus] = useState({
    message: "",
    isSuccess: true,
    show: false,
  });

  const showStatus = (message, isSuccess = true) => {
    setStatus({ message, isSuccess, show: true });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main>
        {status.show && (
          <StatusMessage
            message={status.message}
            isSuccess={status.isSuccess}
          />
        )}
        <Outlet context={{ showStatus }} />
      </main>
    </div>
  );
}

export default MainLayout;
