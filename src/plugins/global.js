// 本地储存
export const setLocalStore = (key, value) => {
  if (!key) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStore = (key) => {
  if (!key) return;
  let temp = window.localStorage.getItem(key);
  return JSON.parse(temp);
}

export const removeLocalStore = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
}