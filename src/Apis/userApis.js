import axios from "./baseAxios";
import { store } from "../store/store";
import { UserDataActions } from "../store/reducers/userData";

export const fetchUserDetails = async () => {
  try {
    const res = await axios.get("/api/v1/users/");
    store.dispatch(UserDataActions.setProfile(res.data.user));
  } catch (e) {
    console.log("Unable to fech user details....");
  }
  store.dispatch(UserDataActions.setLoading(false));
};

export const refreshProfile = async () => {
  store.dispatch(UserDataActions.setLoading(true));
  try {
    const res = await axios.patch("/api/v1/users/refresh");
    store.dispatch(UserDataActions.setProfile(res.data.user));
  } catch (e) {
    //noting ig
  }
  store.dispatch(UserDataActions.setLoading(false));
};
