
export const loadState = () => {
    try {
        //let localDB = require("./db");
        //const serializedState = localDB;
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        //return serializedState;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};