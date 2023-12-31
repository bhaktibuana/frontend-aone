import { client } from "@/utils/functions/httpClient";

import { ICheckUsername } from "@/types/apis/Authentication/queries/ICheckUsernameQuery";
import { ICheckEmail } from "@/types/apis/Authentication/queries/ICheckEmailQuery";
import { IRegisterFormData } from "@/types";

const basePath = "/api/auth/register";

const checkUsername = (params: ICheckUsername) => {
  const url = `${basePath}/checkUsername`;
  return client.get(url, { params });
};

const checkEmail = (params: ICheckEmail) => {
  const url = `${basePath}/checkEmail`;
  return client.get(url, { params });
};

const register = (params: IRegisterFormData["data"]) => {
  const url = `${basePath}`;
  return client.post(url, params);
};

export const APIRegister = {
  checkUsername,
  checkEmail,
  register,
};
