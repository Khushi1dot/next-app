import * as CONSTANT from "./constant";
const initialState = {
  isLoggedin: false,
  access_token: "",
  registrationSuccess: false,
  forgotPasswordSuccess:false,
  resetPasswordSuccess:false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.LOGIN_SUCCESSFULLY:
      return {
        ...state,
        isLoggedin: true,
        access_token: action.payload,
      };
      case CONSTANT.REGISTER_SUCCESSFULLY:
        return {
          ...state,
          registrationSuccess: true,
        };
        case CONSTANT.FORGOT_PASSWORD:
          return{
            ...state,
            forgotPasswordSuccess:true,
          }
          case CONSTANT.RESET_PASSWORD:
          return{
            ...state,
            resetPasswordSuccess:true,
          }
    default:
      return state;
  }
};
export default authReducer;
