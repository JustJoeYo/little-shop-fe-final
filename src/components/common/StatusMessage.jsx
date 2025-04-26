function StatusMessage({ message, isSuccess }) {
  return (
    <div className={`status-message ${isSuccess ? "success" : "fail"}`}>
      {message}
    </div>
  );
}

export default StatusMessage;
