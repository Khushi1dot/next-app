import store from "../../store";
import * as Action from "./action";

// authObj is an object that has a logi method, which dispatches the login action from the action.js file
// to the Redux store.
const authObj = {
  login: (requestObject:any) => store.dispatch(Action.login(requestObject)),
  register:(requestObject:any)=> store.dispatch(Action.register(requestObject)),
  forgotPassword:(requestObject:any)=>store.dispatch(Action.forgotPassword(requestObject)),
  resetPassword:(requestObject:any)=>store.dispatch(Action.resetPassword(requestObject)),
};

export default authObj;
