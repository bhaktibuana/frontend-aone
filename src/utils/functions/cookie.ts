export const setCookie = (
  name: string,
  value: string | number,
  days: number,
  domain: string
): void => {
  let expires: string = "";
  let cookie: string;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  cookie = `${name}=${value}${expires}; path=/`;

  if (domain) cookie += `; domain=${domain}`;

  document.cookie = cookie;
};

export const getCookie = (name: string): string | null => {
  name = `${name}=`;
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ")
      cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(name) === 0)
      return cookie.substring(name.length, cookie.length);
  }

  return null;
};

export const removeCookie = (name: string): void => {
  setCookie(name, "", -1, "");
};
