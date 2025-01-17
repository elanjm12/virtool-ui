import { has } from "lodash-es";
import { select, takeEvery, takeLatest } from "redux-saga/effects";
import {
    CANCEL_JOB,
    CLEAR_JOBS,
    FIND_JOBS,
    GET_JOB,
    GET_LINKED_JOB,
    REMOVE_JOB,
    WS_UPDATE_JOB
} from "../app/actionTypes";
import { apiCall, pushFindTerm } from "../utils/sagas";
import * as jobsAPI from "./api";
import { getJobDetailId, getLinkedJobs } from "./selectors";

export function* watchJobs() {
    yield takeLatest(FIND_JOBS.REQUESTED, findJobs);
    yield takeLatest(GET_JOB.REQUESTED, getJob);
    yield takeEvery(CANCEL_JOB.REQUESTED, cancelJob);
    yield takeEvery(REMOVE_JOB.REQUESTED, removeJob);
    yield takeLatest(CLEAR_JOBS.REQUESTED, clearJobs);
    yield takeLatest(WS_UPDATE_JOB, wsUpdateJob);
    yield takeEvery(GET_LINKED_JOB.REQUESTED, getLinkedJob);
}

export function* wsUpdateJob(action) {
    const jobId = action.payload.id;
    const jobDetailId = yield select(getJobDetailId);

    if (jobId === jobDetailId) {
        yield apiCall(jobsAPI.get, { jobId }, GET_JOB);
    }

    const linkedJobs = yield select(getLinkedJobs);

    if (has(linkedJobs, jobId)) {
        yield apiCall(jobsAPI.get, { jobId }, GET_LINKED_JOB);
    }
}

export function* findJobs(action) {
    yield apiCall(jobsAPI.find, action.payload, FIND_JOBS);
    yield pushFindTerm(action.term);
}

export function* getJob(action) {
    yield apiCall(jobsAPI.get, action.payload, GET_JOB);
}

export function* getLinkedJob(action) {
    yield apiCall(jobsAPI.get, action.payload, GET_LINKED_JOB);
}

export function* cancelJob(action) {
    yield apiCall(jobsAPI.cancel, action.payload, CANCEL_JOB);
}

export function* removeJob(action) {
    yield apiCall(jobsAPI.remove, action.payload, REMOVE_JOB);
}

export function* clearJobs(action) {
    yield apiCall(jobsAPI.clear, action.payload, REMOVE_JOB);
}
