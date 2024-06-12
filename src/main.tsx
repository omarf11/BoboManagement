import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { Provider } from "react-redux";
import store from "./store/rootReducer.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
      <Provider store={store}>
        <App />
      </Provider>
);
