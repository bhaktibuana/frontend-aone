import { client } from "@/utils/functions/httpClient";

import { IVerifyEmail } from "@/types/apis/Authentication/queries/IVerifyEmailQuery";

const basePath = "/api/auth/emailVerification";

const verifyEmail = (params: IVerifyEmail) => {
  const url = `${basePath}`;
  return client.post(url, null, { params });
};

export const APIVerifyEmail = {
  verifyEmail,
};
