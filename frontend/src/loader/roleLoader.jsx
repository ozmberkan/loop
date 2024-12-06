import { redirect } from "react-router-dom";
import { store } from "~/redux/store";

export const roleLoader = (requiredRoles) => {
  const state = store.getState();
  const user = state.users.user;

  if (user && requiredRoles.includes(user.role)) {
    return null;
  }

  return redirect("/login");
};
