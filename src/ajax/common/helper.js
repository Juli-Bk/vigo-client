export const getAuthHeader = () => {
  const token = getJWTfromCookie();

  if (!token) throw new Error('unauthorized');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/json');
  return myHeaders;
};

export const putJWTtoCookie = (loginResponse) => {
  deleteJWTcookie();
  const exp = new Date(loginResponse.expires);
  document.cookie = `token=${loginResponse.token};expires=${exp};SameSite=Strict`;
};

export const putUserIdToCookie = (loginResponse) => {
  const exp = new Date(loginResponse.token.expires);
  document.cookie = `userId=${loginResponse.user._id};expires=${exp};SameSite=Strict`;
};

const getCookie = () => {
  const cookie = document.cookie;
  return cookie && cookie.split('; ');
};

export const getJWTfromCookie = () => {
  const cookie = getCookie();
  const token = cookie && cookie.filter(item => item.includes('token'));
  const tokenData = token && token[0] && token[0].split('=');
  if (tokenData && tokenData[0] === 'token') {
    return tokenData[1];
  }
};

export const getUserIdFromCookie = () => {
  const user = getCookie() && getCookie().filter(item => item.includes('userId'));
  const userData = user && user[0] ? user[0].split('=') : [];
  if (userData[0] === 'userId') {
    return userData[1];
  }
};

export const deleteJWTcookie = () => {
  let exp = new Date(Date.now() - 1000);
  exp = exp.toUTCString();
  const token = getJWTfromCookie();
  document.cookie = `token=${token};expires=${exp}`;
};

export const isGuid = (value) => {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  return checkForHexRegExp.test(value);
};

export const checkId = (id) => {
  if (!id) throw new TypeError('id is required');
  if (!isGuid(id)) throw new TypeError('id is not GUID');
};

export const getQueryString = (sortingData = {}) => {
  const {
    startPage = 'no-pagination',
    perPage = 'no-pagination',
    sort = null
  } = sortingData;

  let filterArr = [];
  if (!isNaN(Number(startPage))) filterArr.push({startPage: Number(startPage)});
  if (!isNaN(Number(perPage))) filterArr.push({perPage: Number(perPage)});
  // use page filters only in pair
  if (filterArr.length !== 2) filterArr = [];
  if (sort) filterArr.push({sort: sort});

  return filterArr
    .map(filter => Object.keys(filter).map(key => `${key}=${filter[key]}`))
    .join('&');
};

export const getFilterString = (filterArray = [], sortingData) => {
  const queryString = getQueryString(sortingData);

  const filterString = filterArray.map(filter =>
    Object.keys(filter).map(key => `${key}=${filter[key]}`)
  ).join('&');

  return filterString.length
    ? filterString + '&' + queryString
    : queryString;
};