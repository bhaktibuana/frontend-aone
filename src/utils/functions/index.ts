import CryptoJS from "crypto-js";

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
