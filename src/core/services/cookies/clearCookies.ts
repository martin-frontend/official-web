import Cookies from 'js-cookie';

export default function clearCookies(): void {
  Object.keys(Cookies.get()).forEach((cookie) => {
    Cookies.remove(cookie);
  });
}
