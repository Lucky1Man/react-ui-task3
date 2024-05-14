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

const initialState = {
    executionFactsList: [],
    hasPendingDelete: false,
    isLoadingExecutionFacts: false
};

const removeFactFromList = (factsList, factId) => {
    return factsList.toSpliced(factsList.findIndex(fact => fact.id === factId), 1);
}

export default function Reducer(state = initialState, action) {
    switch(action.type) {
        case ERROR_RECEIVE_EXECUTION_FACTS: {
            return {
                ...state,
                isLoadingExecutionFacts: false
            }
        }
        case REQUEST_EXECUTION_FACTS: {
            return {
                ...state,
                isLoadingExecutionFacts: true
            }
        }
        case RECEIVE_EXECUTION_FACTS: {
            return {
                ...state,
                executionFactsList: action.payload,
                isLoadingExecutionFacts: false
            }
        }
        case ERROR_DELETE_EXECUTION_FACT: {
            return {
                ...state,
                hasPendingDelete: false
            }
        }
        case REQUEST_DELETE_EXECUTION_FACT: {
            return {
                ...state,
                hasPendingDelete: true
            }
        }
        case SUCCESS_DELETE_EXECUTION_FACT: {
            return {
                ...state,
                executionFactsList: removeFactFromList(state.executionFactsList, action.payload),
                hasPendingDelete: false
            }
        }
        default: {
            return state;
        }
    }
}