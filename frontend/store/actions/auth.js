import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


export const authenticate = (userId, token, isAdmin) => {
  return dispatch => {
    saveDataToStorage(userId, token);
    dispatch({ type: AUTHENTICATE, userId: userId, token: token ,isAdmin:isAdmin });
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};
