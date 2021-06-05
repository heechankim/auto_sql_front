import Reducers from "./Reducers";
import {createStore} from "redux";
import {persistStore} from "redux-persist";

export const Store = createStore(
    Reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const Persistor = persistStore(Store);

export default {Store, Persistor};