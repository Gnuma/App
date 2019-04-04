import store from "../store/store";
import NavigationService from "../navigator/NavigationService";

export default () => {
  const token = store.getState().auth.token;
  return new Promise(function(resolve, reject) {
    if (token) {
      resolve(token);
    } else {
      NavigationService.navigate("AUTH", { resolve, reject });
    }
  });
};
