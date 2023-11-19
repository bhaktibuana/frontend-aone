import { client } from "@/utils/functions/httpClient";

import { ICheckUsername } from "@/types/apis/Authentication/queries/ICheckUsernameQuery";
import { ICheckEmail } from "@/types/apis/Authentication/queries/ICheckEmailQuery";

const basePath = "/api/auth";

const checkUsername = (params: ICheckUsername) => {
  const url = `${basePath}/checkUsername`;
  return client.get(url, { params });
};

const checkEmail = (params: ICheckEmail) => {
  const url = `${basePath}/checkEmail`;
  return client.get(url, { params });
};

export const APIAuthentication = {
  checkUsername,
  checkEmail,
};
