import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);

    if (error.response && error.response.data) {
      // Handle different error formats from Rails
      if (typeof error.response.data === "string") {
        error.serverMessage = error.response.data;
      } else if (error.response.data.errors) {
        if (Array.isArray(error.response.data.errors)) {
          error.serverMessage = error.response.data.errors.join(", ");
        } else if (typeof error.response.data.errors === "object") {
          const errorMessages = [];
          Object.entries(error.response.data.errors).forEach(
            ([field, errors]) => {
              if (Array.isArray(errors)) {
                errors.forEach((err) => errorMessages.push(`${field} ${err}`));
              } else {
                errorMessages.push(`${field} ${errors}`);
              }
            }
          );
          error.serverMessage = errorMessages.join(", ");
        } else {
          error.serverMessage = error.response.data.errors;
        }
      } else if (error.response.data.error) {
        error.serverMessage = error.response.data.error;
      } else {
        error.serverMessage = "An unknown error occurred"; // Fallback message (uh oh gross)
      }
    }

    return Promise.reject(error);
  }
);

export const fetchData = (endpoint) => API.get(endpoint);
export const postData = (endpoint, data) => API.post(endpoint, data);
export const patchData = (endpoint, data) => API.patch(endpoint, data);
export const deleteData = (endpoint) => API.delete(endpoint);
