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

export const generateAvatarLetter = (
  firstName: string,
  lastName: string
): string => {
  let strFirstName = "";
  let strLastName = "";
  if (firstName !== "") {
    strFirstName = firstName[0];
  }
  if (lastName !== "") {
    strLastName = lastName[0];
  }
  return strFirstName + strLastName;
};

export const parseNameLength = (inputString: string): string => {
  const nameArr = inputString.split(" ");
  let expectedString = inputString;

  if (inputString.length > 18) {
    const newNameArr = nameArr.map((value, index) => {
      if (index === 0 || index === 1) return value;
      return value[0];
    });
    expectedString = newNameArr.join(" ");
  }

  return expectedString;
};

export const generateColor = (
  inputString: string
): { baseColor: string; darkShade: string; lightShade: string } => {
  const stringToColor = () => {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = (hash & 0x00ffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, "0");
    return `#${color}`;
  };

  const generateShades = (baseColor: string) => {
    const parsedColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      baseColor
    );
    const red = parseInt((parsedColor as RegExpExecArray)[1], 16);
    const green = parseInt((parsedColor as RegExpExecArray)[2], 16);
    const blue = parseInt((parsedColor as RegExpExecArray)[3], 16);

    const shadeFactor = 0.6;

    const darkerRed = Math.max(0, Math.floor(red - red * shadeFactor));
    const darkerGreen = Math.max(0, Math.floor(green - green * shadeFactor));
    const darkerBlue = Math.max(0, Math.floor(blue - blue * shadeFactor));
    const darkShade = `#${darkerRed.toString(16).padStart(2, "0")}${darkerGreen
      .toString(16)
      .padStart(2, "0")}${darkerBlue.toString(16).padStart(2, "0")}`;

    const lighterRed = Math.min(
      255,
      Math.floor(red + (255 - red) * shadeFactor)
    );
    const lighterGreen = Math.min(
      255,
      Math.floor(green + (255 - green) * shadeFactor)
    );
    const lighterBlue = Math.min(
      255,
      Math.floor(blue + (255 - blue) * shadeFactor)
    );
    const lightShade = `#${lighterRed
      .toString(16)
      .padStart(2, "0")}${lighterGreen
      .toString(16)
      .padStart(2, "0")}${lighterBlue.toString(16).padStart(2, "0")}`;

    return [baseColor, darkShade, lightShade];
  };

  const [baseColor, darkShade, lightShade] = generateShades(stringToColor());

  return {
    baseColor,
    darkShade,
    lightShade,
  };
};
