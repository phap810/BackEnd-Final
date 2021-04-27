import Cookies from 'js-cookie';
export const setCookie = (name, source) => {
  if (source) {
    Cookies.set(name, source, { expires: 1 });
  }
};

export const getCookie = name => {
  const target = Cookies.get(name) || null;
  return target;
};

export const removeCookie = (name = null) => {
  if (!name) return false;
  const target = Cookies.get(name) || null;
  if (target) {
    Cookies.remove(name);
    return true;
  } else {
    return false;
  }
};

export const isLogin = () => {
  const token = getCookie('token');
  return !!token;
};
