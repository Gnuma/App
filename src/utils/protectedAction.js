import store from "../store/store";
import NavigationService from "../navigator/NavigationService";
import { StackActions, NavigationActions } from "react-navigation";

export default () => {
  const { token, isActive } = store.getState().auth;
  return new Promise(function(resolve, reject) {
    if (token && isActive) {
      resolve(token);
    } else {
      if (!token) {
        NavigationService.navigate("AUTH", { resolve, reject });
      } else {
        NavigationService.navigate("PhoneValidation", { resolve, reject });
      }
    }
  });
};
