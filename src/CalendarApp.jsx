import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { store } from "./store/store";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
