import { noop } from "lodash-es";
import { buffers, END, eventChannel } from "redux-saga";
import { call, put, take, takeEvery, throttle } from "redux-saga/effects";
import { FIND_FILES, REMOVE_FILE, UPLOAD } from "../app/actionTypes";
import { apiCall, putGenericError } from "../utils/sagas";
import { uploadFailed, uploadProgress } from "./actions";
import * as filesAPI from "./api";

export function* watchFiles() {
    yield throttle(100, FIND_FILES.REQUESTED, findFiles);
    yield takeEvery(REMOVE_FILE.REQUESTED, removeFile);
    yield takeEvery(UPLOAD.REQUESTED, upload);
}

export function* findFiles(action) {
    yield apiCall(filesAPI.list, action.payload, FIND_FILES, {
        fileType: action.payload.fileType
    });
}

export function* removeFile(action) {
    yield apiCall(filesAPI.remove, action.payload, REMOVE_FILE);
}

export function* upload(action) {
    const { localId } = action.payload;
    const channel = yield call(createUploadChannel, action.payload, filesAPI.upload);
    yield watchUploadChannel(channel, UPLOAD, localId);
}

export const createUploadChannel = (action, apiMethod) =>
    eventChannel(emitter => {
        const onProgress = e => {
            if (e.lengthComputable) {
                emitter({ progress: e.percent });
            }
        };

        const onSuccess = response => {
            emitter({ response });
            emitter(END);
        };

        const onFailure = err => {
            emitter({ err });
            emitter(END);
        };

        apiMethod({
            ...action,
            onProgress,
            onSuccess,
            onFailure
        });

        return noop;
    }, buffers.sliding(2));

export function* watchUploadChannel(channel, actionType, localId) {
    while (true) {
        const { progress = 0, response, err } = yield take(channel);

        if (err) {
            yield put(uploadFailed(localId));
            return yield putGenericError(actionType, err);
        }
        if (response) {
            return yield put({
                type: actionType.SUCCEEDED,
                payload: {
                    ...response.body,
                    localId
                }
            });
        }

        yield put(uploadProgress(localId, progress));
    }
}
