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
    filteredExecutionFactsDto: {
        executionFacts: [],
        totalPages: 0
    },
    hasPendingDelete: false,
    isLoadingExecutionFacts: false,
    errorsFetchingFactsByFilterMessage: undefined
};

const removeFactFromList = (factsDto, factId) => {
    const facts = factsDto.executionFacts;
    return {
        executionFacts: facts.toSpliced(facts.findIndex(fact => fact.id === factId), 1),
        totalPages: factsDto.totalPages
    }
}

export default function Reducer(state = initialState, action) {
    switch(action.type) {
        case ERROR_RECEIVE_EXECUTION_FACTS: {
            return {
                ...state,
                isLoadingExecutionFacts: false,
                errorsFetchingFactsByFilterMessage: action.payload.message
            }
        }
        case REQUEST_EXECUTION_FACTS: {
            return {
                ...state,
                isLoadingExecutionFacts: true,
                errorsFetchingFactsByFilterMessage: initialState.errorsFetchingFactsByFilterMessage
            }
        }
        case RECEIVE_EXECUTION_FACTS: {
            return {
                ...state,
                filteredExecutionFactsDto: action.payload,
                isLoadingExecutionFacts: false
            }
        }
        case ERROR_DELETE_EXECUTION_FACT: {
            //I display generic message if something goes wrong
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
                filteredExecutionFactsDto: removeFactFromList(state.filteredExecutionFactsDto, action.payload),
                hasPendingDelete: false,
            }
        }
        default: {
            return state;
        }
    }
}