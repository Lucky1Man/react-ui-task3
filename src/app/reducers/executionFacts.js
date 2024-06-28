import {
    ERROR_RECEIVE_EXECUTION_FACTS,
    REQUEST_EXECUTION_FACTS,
    RECEIVE_EXECUTION_FACTS,
    ERROR_DELETE_EXECUTION_FACT,
    REQUEST_DELETE_EXECUTION_FACT,
    SUCCESS_DELETE_EXECUTION_FACT,
    ERROR_GET_EXECUTION_FACT,
    REQUEST_EXECUTION_FACT,
    RECEIVE_EXECUTION_FACT,
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
    isLoadingExecutionFact: false,
    errorsFetchingFactsByFilterMessage: undefined,
    originalFact: {
        id: '',
        startTime: '',
        finishTime: '',
        description: '',
        executor: {
            id: '',
            fullName: '',
            email: ''
        }
    },
    isUpdatingExecutionFact: false,
    errorsManipulatingExecutionFact: undefined,
    isSavingExecutionFact: false,
    saveFactResult: {
        success: false,
        factId: ''
    },
    successFactUpdate: false,
    successDelete: true
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
            //I display generic message if something goes wrong as the only reason
            // it can fail is backend being offline, according to my backend implementation
            return {
                ...state,
                hasPendingDelete: false,
                successDelete: false
            }
        }
        case REQUEST_DELETE_EXECUTION_FACT: {
            return {
                ...state,
                hasPendingDelete: true,
                successDelete: true
            }
        }
        case SUCCESS_DELETE_EXECUTION_FACT: {
            return {
                ...state,
                filteredExecutionFactsDto: removeFactFromList(state.filteredExecutionFactsDto, action.payload),
                hasPendingDelete: false,
                successDelete: true
            }
        }
        case ERROR_GET_EXECUTION_FACT: {
            return {
                ...state,
                isLoadingExecutionFact: false
            }
        }
        case REQUEST_EXECUTION_FACT: {
            return {
                ...state,
                isLoadingExecutionFact: true
            }
        }
        case RECEIVE_EXECUTION_FACT: {
            return {
                ...state,
                originalFact: action.payload,
                isLoadingExecutionFact: false,
            }
        }
        case ERROR_UPDATE_EXECUTION_FACT: {
            return {
                ...state,
                isUpdatingExecutionFact: false,
                errorsManipulatingExecutionFact: action.payload.message,
                successFactUpdate: false
            }
        }
        case REQUEST_UPDATE_EXECUTION_FACT: {
            return {
                ...state,
                isUpdatingExecutionFact: true,
                errorsManipulatingExecutionFact: initialState.errorsFetchingFactsByFilterMessage,
                successFactUpdate: false
            }
        }
        case SUCCESS_UPDATE_EXECUTION_FACT: {
            return {
                ...state,
                isUpdatingExecutionFact: false,
                successFactUpdate: true
            }
        }
        case ERROR_SAVE_EXECUTION_FACT: {
            return {
                ...state,
                isSavingExecutionFact: false,
                errorsManipulatingExecutionFact: action.payload.message,
                saveFactResult: initialState.saveFactResult
            }
        }
        case REQUEST_SAVE_EXECUTION_FACT: {
            return {
                ...state,
                isSavingExecutionFact: true,
                errorsManipulatingExecutionFact: initialState.errorsFetchingFactsByFilterMessage,
                saveFactResult: initialState.saveFactResult
            }
        }
        case SUCCESS_SAVE_EXECUTION_FACT: {
            return {
                ...state,
                isSavingExecutionFact: false,
                saveFactResult: {
                    success: true,
                    factId: action.payload.id
                }
            }
        }
        default: {
            return state;
        }
    }
}