import "./index.css";
import React from "react";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

import App from "./App";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
