import {
    CLEAR_SAMPLE_SELECTION,
    CREATE_SAMPLE,
    DESELECT_SAMPLES,
    FIND_READ_FILES,
    FIND_SAMPLES,
    GET_SAMPLE,
    HIDE_SAMPLE_MODAL,
    REMOVE_SAMPLE,
    SELECT_SAMPLE,
    SHOW_REMOVE_SAMPLE,
    UPDATE_SAMPLE,
    UPDATE_SAMPLE_RIGHTS,
    UPDATE_SEARCH,
    WS_INSERT_SAMPLE,
    WS_REMOVE_SAMPLE,
    WS_UPDATE_SAMPLE
} from "../app/actionTypes";
import { simpleActionCreator } from "../utils/utils";

export const wsInsertSample = data => ({
    type: WS_INSERT_SAMPLE,
    data
});

/**
 * Returns an action that should be dispatched when a sample document is updated via websocket.
 *
 * @func
 * @param data {object} update data passed in the websocket message
 * @returns {object} an action object
 */
export const wsUpdateSample = data => ({
    type: WS_UPDATE_SAMPLE,
    data
});

/**
 * Returns an action that should be dispatched when a sample document is removed via websocket.
 *
 * @func
 * @param data {string} the id for the specific sample
 * @returns {object}
 */
export const wsRemoveSample = data => ({
    type: WS_REMOVE_SAMPLE,
    data
});

export const updateSearch = parameters => ({
    type: UPDATE_SEARCH,
    parameters
});

export const findSamples = ({ labels, page, term, workflows }) => ({
    type: FIND_SAMPLES.REQUESTED,
    labels,
    term,
    page,
    workflows
});

export const findReadFiles = simpleActionCreator(FIND_READ_FILES.REQUESTED);

/**
 * Returns action that can trigger an API call for getting a specific sample.
 *
 * @func
 * @param sampleId {string} the id for the specific sample
 * @returns {object}
 */
export const getSample = sampleId => ({
    type: GET_SAMPLE.REQUESTED,
    sampleId
});

/**
 * Returns action that can trigger an API call for creating a new sample.
 *
 * @func
 * @param name {string} unique name for the sample
 * @param isolate {string} the originating isolate
 * @param host {string} the exact host
 * @param locale {string} location in which the sample was collected
 * @param notes {string} notes for the sample
 * @param srna {boolean} does the sample contain sRNA reads
 * @param subtractions {Array} string - names of the associated subtraction host genomes
 * @param files {object} file ids of one or two files
 * @param group {string} user group the sample will be assigned to
 * @param label {Array} Array of ids(int) of the labels selected
 * @returns {object}
 */
export const createSample = (name, isolate, host, locale, libraryType, subtractions, files, labels, group) => ({
    type: CREATE_SAMPLE.REQUESTED,
    name,
    isolate,
    host,
    locale,
    libraryType,
    subtractions,
    files,
    labels,
    group
});

/**
 * Returns action that can trigger an API call for modifying a sample.
 *
 * @func
 * @param sampleId {string} unique sample id
 * @param update {object} update data
 * @returns {object}
 */
export const editSample = (sampleId, update) => ({
    type: UPDATE_SAMPLE.REQUESTED,
    sampleId,
    update
});

/**
 * Returns action that can trigger an API call for modifying sample rights.
 *
 * @func
 * @param sampleId {string} unique sample id
 * @param update {object} update data
 * @returns {object}
 */
export const updateSampleRights = (sampleId, update) => ({
    type: UPDATE_SAMPLE_RIGHTS.REQUESTED,
    sampleId,
    update
});

/**
 * Returns action that can trigger an API call for removing a sample.
 *
 * @func
 * @param sampleId {string} unique sample id
 * @returns {object}
 */
export const removeSample = sampleId => ({
    type: REMOVE_SAMPLE.REQUESTED,
    sampleId
});

/**
 * Returns action for displaying the remove sample modal.
 *
 * @func
 * @returns {object}
 */
export const showRemoveSample = simpleActionCreator(SHOW_REMOVE_SAMPLE);

/**
 * Returns action for hiding the sample modal.
 *
 * @func
 * @returns {object}
 */
export const hideSampleModal = simpleActionCreator(HIDE_SAMPLE_MODAL);

export const selectSample = sampleId => ({
    type: SELECT_SAMPLE,
    sampleId
});

export const deselectSamples = sampleIds => ({
    type: DESELECT_SAMPLES,
    sampleIds
});

export const clearSampleSelection = simpleActionCreator(CLEAR_SAMPLE_SELECTION);