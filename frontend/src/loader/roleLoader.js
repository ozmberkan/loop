import { getUserService } from "~/redux/slices/usersSlice";
import { store } from "~/redux/store";
import { redirect } from "react-router-dom";

export const roleLoader = async (requiredRoles) => {
  let state = store.getState();
  let { user, status } = state.users;

  if (status === "idle" || status === "loading") {
    await store.dispatch(getUserService());
    state = store.getState();
    user = state.users.user;
    status = state.users.status;
  }

  if (!user) {
    return redirect("/login");
  }

  if (requiredRoles.includes(user.role)) {
    return null;
  }

  return redirect("/login");
};
