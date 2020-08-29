import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../ActionReducre/Reducer";

export default createStore(reducers, applyMiddleware(thunk));
