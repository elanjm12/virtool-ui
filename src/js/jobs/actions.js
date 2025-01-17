import {
    CANCEL_JOB,
    CLEAR_JOBS,
    FIND_JOBS,
    GET_JOB,
    GET_LINKED_JOB,
    REMOVE_JOB,
    WS_INSERT_JOB,
    WS_REMOVE_JOB,
    WS_UPDATE_JOB
} from "../app/actionTypes";
import { createAction } from "@reduxjs/toolkit";
/**
 * Returns an action that should be dispatched when a job document is inserted via websocket.
 *
 * @func
 * @param data {object} the data passed in the websocket message
 * @returns {object}
 */
export const wsInsertJob = createAction(WS_INSERT_JOB);

/**
 * Returns an action that should be dispatched when a job document is updated via websocket.
 *
 * @func
 * @param data {object} the data passed in the websocket message
 * @returns {object}
 */
export const wsUpdateJob = createAction(WS_UPDATE_JOB);

/**
 * Returns an action that should be dispatched when a job document is removed via websocket.
 *
 * @func
 * @param jobId {string} the id for the specific job
 * @returns {object}
 */
export const wsRemoveJob = createAction(WS_REMOVE_JOB);

/**
 * Returns action that can trigger an API call for getting all available jobs.
 *
 * @func
 * @returns {object}
 */

export const findJobs = createAction(FIND_JOBS.REQUESTED, (term, page) => ({
    payload: { term, page }
}));

/**
 * Returns action that can trigger an API call for getting a specific job document.
 *
 * @func
 * @param jobId {string} the id for the specific job
 * @returns {object}
 */
export const getJob = createAction(GET_JOB.REQUESTED, jobId => ({ payload: { jobId } }));

export const getLinkedJob = createAction(GET_LINKED_JOB.REQUESTED, jobId => ({ payload: { jobId } }));

/**
 * Returns action that can trigger an API call for cancelling a currently running job.
 *
 * @func
 * @param jobId {string} the id for the specific job
 * @returns {object}
 */
export const cancelJob = createAction(CANCEL_JOB.REQUESTED, jobId => ({ payload: { jobId } }));

/**
 * Returns action that can trigger an API call for removing a specific job.
 *
 * @func
 * @param jobId {string} the id for the specific job
 * @returns {object}
 */
export const removeJob = createAction(REMOVE_JOB.REQUESTED, jobId => ({ payload: { jobId } }));

/**
 * Returns action that can trigger an API call for clearing a subset of listed jobs.
 *
 * @func
 * @param scope {string} keyword for a category of jobs
 * @returns {object}
 */
export const clearJobs = createAction(CLEAR_JOBS.REQUESTED, scope => ({ payload: { scope } }));
