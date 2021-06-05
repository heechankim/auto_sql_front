import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage/session'

import UserReducer from "./User";
import ErdDataReducer from "./ErdData";
import VuerdDataReducer from "./VuerdData";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["User"],
};

const rootReducer = combineReducers({
    User: UserReducer,
    ErdData: ErdDataReducer,
    VuerdData: VuerdDataReducer,
});

export default persistReducer(persistConfig, rootReducer);