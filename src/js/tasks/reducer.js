import { createReducer } from "@reduxjs/toolkit";
import { GET_TASK, LIST_TASKS, WS_INSERT_TASK, WS_UPDATE_TASK } from "../app/actionTypes";
import { insert, update } from "../utils/reducers";

export const initialState = {
    documents: [],
    detail: null
};

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(WS_INSERT_TASK, (state, action) => {
            return insert(state, action.payload);
        })
        .addCase(WS_UPDATE_TASK, (state, action) => {
            return update(state, action.payload);
        })
        .addCase(LIST_TASKS.SUCCEEDED, (state, action) => {
            state.documents = action.payload;
        })
        .addCase(GET_TASK.REQUESTED, state => {
            state.detail = null;
        })
        .addCase(GET_TASK.SUCCEEDED, (state, action) => {
            state.detail = action.payload;
        });
});

export default tasksReducer;
