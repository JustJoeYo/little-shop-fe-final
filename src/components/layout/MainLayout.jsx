import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import StatusMessage from "../common/StatusMessage";
import { useState } from "react";

function MainLayout() {
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    isSuccess: false,
    visible: false,
  });

  const showStatus = (message, isSuccess) => {
    setStatusMessage({ message, isSuccess, visible: true });
    setTimeout(() => {
      setStatusMessage((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main>
        {statusMessage.visible && (
          <StatusMessage
            message={statusMessage.message}
            isSuccess={statusMessage.isSuccess}
          />
        )}
        <Outlet context={{ showStatus }} />
      </main>
    </div>
  );
}

export default MainLayout;
