let fs = require("fs");

export const loadState = () => {
    let localDB = require("./db");
    try {
        const serializedState = localDB;
        if (serializedState === null) {
            return undefined;
        }
        return serializedState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        fs.writeFile("db.json", serializedState, 'utf8', null);
    } catch {
        // ignore write errors
    }
};

export default {loadState, saveState};