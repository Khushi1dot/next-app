import { API_ENDPOINTS } from "./Endpoint";
import axios from "axios";
import { ResponseEnum } from "./constant";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// console.log(REACT_APP_API_BASE_URL, "REACT_APP_API_BASE_URL");

export const registerUser = async (object:any) => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.REGISER_USER}`;

    const response = await axios.post(url, object, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error:any) {
    console.error("Registration Error:", error);
    return { success: false, message: error.message };
  }
};

export const loginUser = async (object:any) => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.LOGIN_USER}`;

    const response = await axios.post(url, object, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('data from login', response.data);

    if (response.data.success === ResponseEnum.SUCCESS) {
      console.log('data from login', response.data);
      return response.data;
    } else {
      console.log('data from login', response.data);
      return response.data;
    }
  } catch (error:any) {
    console.error("Login Error:", error);
    return { success: false, message: error.message };
  }
};


