import config from 'config';
import axios from 'misc/requests';
import {
    ERROR_DELETE_EXECUTION_FACT,
    ERROR_GET_EXECUTION_FACT,
    ERROR_RECEIVE_EXECUTION_FACTS,
    ERROR_SAVE_EXECUTION_FACT,
    ERROR_UPDATE_EXECUTION_FACT,
    RECEIVE_EXECUTION_FACT,
    RECEIVE_EXECUTION_FACTS,
    REQUEST_DELETE_EXECUTION_FACT,
    REQUEST_EXECUTION_FACT,
    REQUEST_EXECUTION_FACTS,
    REQUEST_SAVE_EXECUTION_FACT,
    REQUEST_UPDATE_EXECUTION_FACT,
    SUCCESS_DELETE_EXECUTION_FACT,
    SUCCESS_SAVE_EXECUTION_FACT,
    SUCCESS_UPDATE_EXECUTION_FACT
} from '../constants/actionTypes';


const EXECUTION_FACTS_SERVICE_URL = `${config.EXECUTION_FACTS_SERVICE}/api/v1/execution-facts`

//Get execution facts list
const errorReceiveExecutionFacts = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_EXECUTION_FACTS,
});

const requestExecutionFacts = () => ({
    type: REQUEST_EXECUTION_FACTS
});

const receiveExecutionFacts = (facts) => ({
    payload: facts,
    type: RECEIVE_EXECUTION_FACTS
});

//Delete execution fact
const errorDeleteExecutionFact = (errors) => ({
    payload: errors,
    type: ERROR_DELETE_EXECUTION_FACT
})

const requestDeleteExecutionFact = (factId) => ({
    payload: factId,
    type: REQUEST_DELETE_EXECUTION_FACT
})

const successDeleteExecutionFact = (factId) => ({
    payload: factId,
    type: SUCCESS_DELETE_EXECUTION_FACT
})

//Get execution fact by id
const errorGetExecutionFact = (errors) => ({
    payload: errors,
    type: ERROR_GET_EXECUTION_FACT
})

const requestExecutionFact = (factId) => ({
    payload: factId,
    type: REQUEST_EXECUTION_FACT
})

const receiveExecutionFact = (fact) => ({
    payload: fact,
    type: RECEIVE_EXECUTION_FACT
})

//Save execution fact
const errorSaveExecutionFact = (errors) => ({
    payload: errors,
    type: ERROR_SAVE_EXECUTION_FACT
})

const requestSaveExecutionFact = () => ({
    type: REQUEST_SAVE_EXECUTION_FACT
})

const successSaveExecutionFact = (factId) => ({
    payload: factId,
    type: SUCCESS_SAVE_EXECUTION_FACT
})

//Update execution fact
const errorUpdateExecutionFact = (errors) => ({
    payload: errors,
    type: ERROR_UPDATE_EXECUTION_FACT
})

const requestUpdateExecutionFact = (factId) => ({
    payload: factId,
    type: REQUEST_UPDATE_EXECUTION_FACT
})

const successUpdateExecutionFact = (factId) => ({
    payload: factId,
    type: SUCCESS_UPDATE_EXECUTION_FACT
})

const getExecutionFacts = ({ executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize }) => {
    return axios({
        method: 'post',
        url: `${EXECUTION_FACTS_SERVICE_URL}/_list`,
        data: { executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize }
    })
}

const deleteExecutionFact = (factId) => {
    return axios({
        method: 'delete',
        url: `${EXECUTION_FACTS_SERVICE_URL}/${factId}`,
    })
}

const getExecutionFact = (factId) => {
    return axios({
        method: 'get',
        url: `${EXECUTION_FACTS_SERVICE_URL}/${factId}`,
    })
}

const createExecutionFact = (createDto) => {
    return axios({
        method: 'post',
        url: `${EXECUTION_FACTS_SERVICE_URL}`,
        data: createDto
    })
}

const updateExecutionFact = (factId, updateDto) => {
    return axios({
        method: 'put',
        url: `${EXECUTION_FACTS_SERVICE_URL}/${factId}`,
        data: updateDto
    })
}



const fetchExecutionFacts = ({ executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize }) => (dispatch) => {
    dispatch(requestExecutionFacts());
    const result = getExecutionFacts({ executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize });
    return result
        .then(data => dispatch(receiveExecutionFacts(data)))
        .catch(error => {
            dispatch(errorReceiveExecutionFacts(error));
        })
}

const performDeleteExecutionFact = (factId) => (dispatch) => {
    dispatch(requestDeleteExecutionFact());
    const result = deleteExecutionFact(factId);
    return result
        .then(() => dispatch(successDeleteExecutionFact(factId)))
        .catch(error => dispatch(errorDeleteExecutionFact(error)))
}

const fetchExecutionFact = (factId) => (dispatch) => {
    dispatch(requestExecutionFact());
    const result = getExecutionFact(factId);
    return result
        .then(data => dispatch(receiveExecutionFact(data)))
        .catch(error => {
            dispatch(errorGetExecutionFact(error));
        })
}

const performCreateExecutionFact = (createDto) => (dispatch) => {
    dispatch(requestSaveExecutionFact());
    const result = createExecutionFact(createDto);
    return result
        .then(data => dispatch(successSaveExecutionFact(data)))
        .catch(error => {
            dispatch(errorSaveExecutionFact(error));
        })
}

const performUpdateExecutionFact = (factId, updateDto) => (dispatch) => {
    dispatch(requestUpdateExecutionFact(factId));
    const result = updateExecutionFact(factId, updateDto);
    return result
        .then(() => {
            dispatch(successUpdateExecutionFact(factId));
        })
        .catch(error => {
            dispatch(errorUpdateExecutionFact(error));
        })
}


const exportFunctions = {
    fetchExecutionFacts,
    performDeleteExecutionFact,
    fetchExecutionFact,
    performCreateExecutionFact,
    performUpdateExecutionFact
};

export default exportFunctions;

