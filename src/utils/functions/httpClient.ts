import axios, { AxiosResponse, AxiosError } from "axios";
import { getCookie, removeCookie } from "@/utils/functions/cookie";
import { useRouter } from "vue-router";

const accessToken = getCookie("accessToken");

const router = useRouter();

const globalResponseHandler = (response: AxiosResponse) => response;

const globalErrorHandler = async (error: AxiosError) => {
  const status = error.response?.status;
  const isTokenExpired = status === 401;

  if (isTokenExpired) {
    const originalRequest = error.config;

    removeCookie("accessToken");
    delete originalRequest?.headers.Authorization;
    router.go(0);
  }

  return Promise.reject(error);
};

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "x-access-token": import.meta.env.VITE_API_X_ACCESS_TOKEN || "",
    Authorization: `Bearer ${accessToken}`,
  },
});
client.interceptors.response.use(globalResponseHandler, globalErrorHandler);
