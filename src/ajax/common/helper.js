import moment from 'moment';
import store from '../../redux/store';
import {setJWTtoken} from '../../redux/actions/actions';

export const getAuthHeader = () => {
  // todo testing from front
  const state = store.getState();
  const token = state.token || getJWTfromCookie();

  if (!token) throw new Error('unauthorized');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/json');
  return myHeaders;
};

export const putJWTtoCookie = (loginResponse) => {
  const exp = moment(Date.now()).add(loginResponse.expiresInMinutes, 'm').toDate();
  document.cookie = `token=${loginResponse.token};expires=${exp}`;
};

export const getJWTfromCookie = () => {
  const cookie = document.cookie;
  const rez = cookie && cookie.split('=');
  if (rez[0] === 'token') {
    return rez[1];
  }
};

export const deleteJWTcookie = () => {
  // todo use this method when sign out
  let exp = new Date(Date.now() - 1000);
  exp = exp.toUTCString();
  const token = getJWTfromCookie();
  document.cookie = `token=${token};expires=${exp}`;
};

export const putJWTtoRedux = (jwt) => {
  jwt && store.dispatch(setJWTtoken(jwt.token));
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