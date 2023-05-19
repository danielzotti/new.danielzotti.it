const mapCookie = () =>
  document.cookie.split(';').reduce((obj, item) => {
    const [key, value] = item.trim().split('=');
    return {
      ...obj,
      [key]: value
    };
  }, {});

export const getCookie = (name: string) => mapCookie()?.[name];

export const setCookie = (name: string, value: string, days = 3650) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()}`;
};

export const deleteCookie = (name: string) => setCookie(name, '', -1);
