import axios from 'misc/requests';
import config from 'config';
import storage, { keys } from 'misc/storage';
import {
    ERROR_RECEIVE_EXECUTION_FACTS,
    REQUEST_EXECUTION_FACTS,
    RECEIVE_EXECUTION_FACTS,
    ERROR_DELETE_EXECUTION_FACT,
    REQUEST_DELETE_EXECUTION_FACT,
    SUCCESS_DELETE_EXECUTION_FACT,
    ERROR_SAVE_EXECUTION_FACT,
    REQUEST_SAVE_EXECUTION_FACT,
    SUCCESS_SAVE_EXECUTION_FACT,
    ERROR_UPDATE_EXECUTION_FACT,
    REQUEST_UPDATE_EXECUTION_FACT,
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



const fetchExecutionFacts = ({ executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize }) => (dispatch) => {
    dispatch(requestExecutionFacts());
    const result = getExecutionFacts({ executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize });
    result
        .then(data => dispatch(receiveExecutionFacts(data)))
        .catch(error => dispatch(errorReceiveExecutionFacts(error)))
    return result;
}

const performDeleteExecutionFact = (factId) => (dispatch) => {
    dispatch(requestDeleteExecutionFact());
    const result = deleteExecutionFact(factId);
    result
        .then(() => dispatch(successDeleteExecutionFact(factId)))
        .catch(error => dispatch(errorDeleteExecutionFact(error)))
    return result;
}


const exportFunctions = {
    fetchExecutionFacts,
    performDeleteExecutionFact
};

export default exportFunctions;

