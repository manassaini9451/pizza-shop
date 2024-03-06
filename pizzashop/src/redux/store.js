import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Importing `thunk` directly as a named export
import pizzaReducer from "./reducers";

const store = createStore(pizzaReducer, applyMiddleware(thunk));

export default store;
