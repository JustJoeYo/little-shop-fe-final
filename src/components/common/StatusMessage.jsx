import { useState, useEffect } from "react";
import "../../styles/StatusMessage.css";

function StatusMessage({ message, isSuccess, show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, message]);

  if (!message) {
    return <div className="status-message-container"></div>;
  }

  return (
    <div className="status-message-container">
      <div
        className={`status-message ${isSuccess ? "success" : "fail"} ${
          visible ? "visible" : "hidden"
        }`}
        aria-live="polite"
      >
        {message}
      </div>
    </div>
  );
}

export default StatusMessage;
