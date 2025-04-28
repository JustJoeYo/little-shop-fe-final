import { useEffect, useState } from "react";
import "../../styles/StatusMessage.css";

function StatusMessage({ message, isSuccess }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`status-message ${isSuccess ? "success" : "fail"} ${
        visible ? "visible" : "hidden"
      }`}
    >
      {message}
    </div>
  );
}

export default StatusMessage;
