import {configureStore} from "@reduxjs/toolkit";
import {presentationReducer} from "./presentation";
import {rootReducer} from "./reducers";

export const store = configureStore({
    reducer: rootReducer
});

export type AppState = ReturnType<typeof rootReducer >;
