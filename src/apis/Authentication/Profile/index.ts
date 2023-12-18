import { client } from "@/utils/functions/httpClient";

import { IUpdateUserInfo } from "@/types/apis/Authentication/request/IUpdateUserInfoRequest";
import { IChangePassword } from "@/types/apis/Authentication/request/IChangePasswordRequest";

const basePath = "/api/auth/profile";

const myToken = () => {
  const url = `${basePath}`;
  return client.get(url);
};

const updateUserInfo = (params: IUpdateUserInfo) => {
  const url = `${basePath}/userInfo`;
  return client.put(url, params);
};

const changePassword = (params: IChangePassword) => {
  const url = `${basePath}/changePassword`;
  return client.put(url, params);
};

export const APIProfile = {
  myToken,
  updateUserInfo,
  changePassword,
};
