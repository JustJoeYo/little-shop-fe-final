import "../../styles/ApiErrorMessage.css";

function ApiErrorMessage({ error }) {
  if (!error) return null;

  const message = getErrorMessage(error);

  return (
    <div className="api-error">
      <div className="api-error-message">{message}</div>
    </div>
  );
}

function getErrorMessage(error) {
  if (error.serverMessage) {
    return error.serverMessage;
  }

  if (error.response?.data) {
    const { data } = error.response;

    if (typeof data === "string") {
      return data;
    }

    if (data.errors) {
      return Array.isArray(data.errors) ? data.errors.join(", ") : data.errors;
    }

    if (data.error) {
      return data.error;
    }
  }

  if (error.message) {
    return error.message;
  }

  return "An unknown error occurred";
}

export default ApiErrorMessage;
