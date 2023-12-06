import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

import { IGetUserData } from "@/types";

export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const hashPassword = (password: string): string => {
  const salt = "p@5s.@0n3";
  return CryptoJS.HmacSHA256(password, salt).toString(CryptoJS.enc.Hex);
};

export const hideEmail = (email: string): string => {
  const mailStrLen = email.split("@")[0].length;
  let regex = /(.{2})(.*)(.{2})(?=@)/;
  if (mailStrLen <= 6) regex = /(.{1})(.*)(.{1})(?=@)/;
  return email.replace(regex, (_x, y, z, e) => {
    for (let i = 0; i < z.length; i++) {
      y += "*";
    }
    return y + e;
  });
};

export const getUserData = (accessToken: string): IGetUserData => {
  try {
    const decodedToken: IGetUserData["payload"] = jwtDecode(accessToken);
    if (Date.now() > decodedToken.exp * 1000) {
      return {
        isExpired: true,
        isInvalidToken: false,
        payload: {} as IGetUserData["payload"],
      };
    } else {
      return {
        isExpired: false,
        isInvalidToken: false,
        payload: decodedToken,
      };
    }
  } catch (error) {
    return {
      isExpired: false,
      isInvalidToken: true,
      payload: {} as IGetUserData["payload"],
    };
  }
};
