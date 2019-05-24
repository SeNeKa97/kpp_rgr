import {loadState, saveState} from "./localStorage";
import {createStore} from "redux";
import invoicesReducer from "../reducers/root";
import throttle from "lodash.throttle";

const persistedState = loadState();
const store = createStore(
    invoicesReducer,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        appState: store.getState().appState,
        count: store.getState().count,
        currentInvoice: store.getState().currentInvoice,
        invoices: store.getState().invoices
    });
}, 1000));

export default store;