import { config } from '../config';

export const localStorage90sTheme = 'nineties';

export const activate90s = () => {
  alert('YOU DID IT! You went back in time! You are now in the 90\'s and websites looked like this one........');
  localStorage.setItem(config.themeLocalStorageName, localStorage90sTheme);
  window.location.reload();
};

export const deactivate90s = () => {
  localStorage.setItem(config.themeLocalStorageName, 'os default');
  window.location.reload();
};

export const is90sActive = () => {
  return localStorage.getItem(config.themeLocalStorageName) === localStorage90sTheme;
};
