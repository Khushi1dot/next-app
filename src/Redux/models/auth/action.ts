import { Auth } from '@/Services/index'
import * as CONSTANTS from "./constant";
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
export const login = (requestObject:any) => async (dispatch:Dispatch) => {
  try {
    const response = await Auth.loginUser(requestObject);
    // console.log("Login Response:", response.token);
    // console.log(response, "tokentokentokentoken");
  const access_token = response?.data?.access_token;

    console.log(access_token);

    // alert("Login successful");
    Cookies.set("access_token", access_token);
    Cookies.set("isAuthenticated", "true");
    dispatch({ type: CONSTANTS.LOGIN_SUCCESSFULLY, payload: access_token });
    return response;
  } catch (error) {
    console.log(error, "error");
  }
};

export const register = (requestObject:any) => async (dispatch:Dispatch) => {
  try {
    const response = await Auth.registerUser(requestObject);
    console.log("Register Response:", response);

    if (response.success) {
      console.log(response);
      dispatch({ type: CONSTANTS.REGISTER_SUCCESSFULLY });
      return response;
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const forgotPassword = (requestObject:any) => async (dispatch:any, getState:any) => {
  try {
    const response = await Auth.forgotPassword(requestObject);
    console.log("forgot password:", response);

    if (response.success) {
      console.log(response);
      dispatch({ type: CONSTANTS.FORGOT_PASSWORD });
      return response;
    } else {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const resetPassword = (requestObject:any) => async (dispatch:any, getState:any) => {
  try {
    const response = await Auth.resetPassowrd(requestObject);
    console.log("reset password:", response);

    if (response.success) {
      console.log(response);
      dispatch({ type: CONSTANTS.RESET_PASSWORD });
      return response;
    }
  } catch (error) {
    console.log(error, "error");
  }
};
