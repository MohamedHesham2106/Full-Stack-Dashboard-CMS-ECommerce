import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const setCookie = (key: string, value: string, expiresIn: number) => {
  // Calculate the expiration date in seconds from the current time
  const expirationInSeconds = Date.now() / 1000 + expiresIn;

  // Set the cookie with the calculated expiration date
  Cookies.set(key, value, {
    expires: new Date(expirationInSeconds * 1000),
    secure: true,
  });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

export const payload = (token: string) => {
  return jwtDecode(token);
};
