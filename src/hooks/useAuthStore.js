import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const { states, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const starLogin = async ({ email, password }) => {
    try {
      const resp = await calendarApi.post("/auth", { email, password });
      console.log({ resp });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return {
    //* Propiedades
    states,
    user,
    errorMessage,

    //* Métodos
    starLogin,
  };
};
