import axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";

const API_BASE_URL = "https://dummyjson.com/"; // Replace with your API base URL

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * An instance of Axios configured with caching capabilities.
 * This instance is created using the `setupCache` function, which wraps
 * the provided API client to enable caching for HTTP requests.
 *
 * @apiclient - The Axios instance to be wrapped with caching capabilities.
 * @returns {AxiosInstance} - The Axios instance with caching enabled.
 */
const axiosInstance = setupCache(apiClient);

// Service functions for CRUD operations
export const fetchData = async (
  endpoint: string,
  headers: any
): Promise<AxiosResponse<any>> => {
  const token = getToken();
  const response = await axiosInstance.get(endpoint, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse<any>> => {
  const response = await apiClient.post(endpoint, data);
  return response;
};

export const updateData = async (
  endpoint: string,
  data: any
): Promise<AxiosResponse<any>> => {
  const response = await apiClient.put(endpoint, data);
  return response;
};

export const deleteData = async (
  endpoint: string
): Promise<AxiosResponse<any>> => {
  const response = await apiClient.delete(endpoint);
  return response.data;
};

/**
 * function to set a cookie
 * @param name cookie name
 * @param value value
 * @param days expires in days
 */
export const setCookies = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
export const getCookies = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
export const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};
export const getToken = () => {
  const token = getCookies("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};
export const setToken = (token: string) => {
  setCookies("token", token, 1);
};
export const removeToken = () => {
  eraseCookie("token");
};
