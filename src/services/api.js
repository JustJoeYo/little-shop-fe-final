import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

const extractErrorMessage = (data) => {
  if (typeof data === "string") {
    return data;
  }

  if (data.errors) {
    if (Array.isArray(data.errors)) {
      return data.errors.join(", ");
    }

    if (typeof data.errors === "object") {
      return Object.entries(data.errors)
        .flatMap(([field, errors]) => {
          if (Array.isArray(errors)) {
            return errors.map((err) => `${field} ${err}`);
          }
          return [`${field} ${errors}`];
        })
        .join(", ");
    }

    return data.errors;
  }

  if (data.error) {
    return data.error;
  }

  return "An unknown error occurred";
};

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);

    if (error.response && error.response.data) {
      error.serverMessage = extractErrorMessage(error.response.data);
    } else {
      error.serverMessage = "Network error or server unavailable";
    }

    return Promise.reject(error);
  }
);

// Data service functions
export const fetchData = (endpoint) => API.get(endpoint);
export const postData = (endpoint, data) => API.post(endpoint, data);
export const patchData = (endpoint, data) => API.patch(endpoint, data);
export const deleteData = (endpoint) => API.delete(endpoint);
