import { client } from "@/utils/functions/httpClient";

import { ILogin } from "@/types/apis/Authentication/request/ILoginRequest";
import { IVerifyLogin } from "@/types/apis/Authentication/request/IVerifyLoginRequest";

const basePath = "/api/auth/login";

const login = (params: ILogin) => {
  const url = `${basePath}`;
  return client.post(url, params);
};

const verifyLogin = (params: IVerifyLogin) => {
  const url = `${basePath}/verifyLogin`;
  return client.post(url, params);
};

export const APILogin = {
  login,
  verifyLogin,
};
