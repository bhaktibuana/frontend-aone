import { client } from "@/utils/functions/httpClient";

const basePath = "/api/auth/logout";

const logout = () => {
  const url = `${basePath}`;
  return client.post(url);
};

export const APILogout = {
  logout,
};
