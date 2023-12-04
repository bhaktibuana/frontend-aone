import { client } from "@/utils/functions/httpClient";

import { ILogin } from "@/types/apis/Authentication/request/ILoginRequest";

const basePath = "/api/auth/login";

const login = (params: ILogin) => {
  const url = `${basePath}`;
  return client.post(url, params);
};

export const APILogin = {
  login,
};
