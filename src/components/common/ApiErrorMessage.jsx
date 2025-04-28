import "../../styles/ApiErrorMessage.css";

function ApiErrorMessage({ error }) {
  if (!error) return null;

  // Extract the most useful error message
  let message = "An unknown error occurred";

  if (error.serverMessage) {
    message = error.serverMessage;
  } else if (error.response && error.response.data) {
    // Try to extract error from response data if serverMessage isn't available
    if (typeof error.response.data === "string") {
      message = error.response.data;
    } else if (error.response.data.errors) {
      message = Array.isArray(error.response.data.errors)
        ? error.response.data.errors.join(", ")
        : error.response.data.errors;
    } else if (error.response.data.error) {
      message = error.response.data.error;
    }
  } else if (error.message) {
    message = error.message;
  }

  return (
    <div className="api-error">
      <div className="api-error-message">{message}</div>
    </div>
  );
}

export default ApiErrorMessage;
