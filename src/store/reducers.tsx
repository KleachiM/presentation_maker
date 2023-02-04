import {combineReducers} from '@reduxjs/toolkit';
import {presentationReducer} from './presentation';

export const rootReducer = combineReducers({
	presentation: presentationReducer,
});