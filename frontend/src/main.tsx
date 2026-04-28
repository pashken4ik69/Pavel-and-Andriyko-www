import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./app/routers/router.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
