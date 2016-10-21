import fetch from 'isomorphic-fetch'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_DENIED
} from '../constants/Login'

export function submitLogin(loginStr, passwordStr) {
  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST
    })

    fetch('/login', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify({
          Username: loginStr,
          Password: passwordStr
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(answer) {
        if (answer) {
          if (answer.Auth === "Logged") {
            dispatch({
              type: LOGIN_SUCCESS,
            })
          } else {
            throw "Denied";
          };
        }
      }).catch(function(e) {
        dispatch({
          type: LOGIN_DENIED
        })
      });

  }
}
