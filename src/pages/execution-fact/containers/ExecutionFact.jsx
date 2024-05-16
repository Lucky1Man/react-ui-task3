import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Button from 'components/Button';
import Snackbar from 'components/Snackbar';
import * as pages from 'constants/pages';
import pageURLs from 'constants/pagesURLs';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditExecutionFact from '../components/EditExecutionFact';
import ViewExecutionFact from '../components/ViewExecutionFact';

const getClasses = createUseStyles({
    factContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    mainPart: {
        flexGrow: '1'
    },
    backButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    editButton: {
        position: 'absolute',
        right: '0px',
        top: '0px'
    }
});

const blankExecutionFact = {
    id: '',
    startTime: '',
    finishTime: '',
    description: '',
    executor: {
        id: '',
        fullName: '',
        email: ''
    }
}

const pageModes = {
    view: 'view',
    edit: 'edit',
    create: 'create'
}

function ExecutionFact({
    fetchExecutionFact, //param factId
    performCreateExecutionFact, //param createDto {executorId, description, startTime, finishTime}
    performUpdateExecutionFact //param factId, updateDto {executorId, description, startTime, finishTime}
}) {
    const { factId } = useParams();
    const location = useLocation();
    const executionFactsStore = useSelector(({ executionFacts }) => executionFacts);
    const classes = getClasses();
    const getActualMode = (mode) => {
        const modeFromUrl = new URLSearchParams(location.search).get('mode');
        if (factId === undefined) {
            return pageModes.create;
        }
        return pageModes[mode] || pageModes[modeFromUrl] || pageModes.view;
    }
    const [state, setState] = useState({
        originalFact: executionFactsStore.originalFact,
        activeMode: getActualMode(pageModes.view),
        saveWasPerformed: false,
        updateWasPerformed: false
    });
    useEffect(() => {
        if (factId !== undefined) {
            fetchExecutionFact(factId);
        }
    }, [fetchExecutionFact, factId])
    useEffect(() => {
        if (executionFactsStore.saveFactResult.success) {
            fetchExecutionFact(executionFactsStore.saveFactResult.factId);
        } else if(executionFactsStore.successFactUpdate) {
            fetchExecutionFact(executionFactsStore.originalFact.id);
        }
    }, [fetchExecutionFact, executionFactsStore.saveFactResult, executionFactsStore.successFactUpdate])
    useEffect(() => {
        setState((oldState) => ({
            ...oldState,
            originalFact: executionFactsStore.originalFact
        }));
    }, [executionFactsStore.originalFact]);
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    return (
        <div className={classes.factContainer}>
            <div className={classes.mainPart}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {state.activeMode === pageModes.view &&
                        <ViewExecutionFact
                            originalFact={state.originalFact}
                            toEditMode={() => {
                                setState({
                                    ...state,
                                    activeMode: getActualMode(pageModes.edit)
                                })
                            }}
                        ></ViewExecutionFact>
                    }
                    {state.activeMode !== pageModes.view &&
                        <EditExecutionFact
                            isSavingExecutionFact={executionFactsStore.isSavingExecutionFact}
                            isUpdatingExecutionFact={executionFactsStore.isUpdatingExecutionFact}
                            saveSuccess={executionFactsStore.saveFactResult.success}
                            updateSuccess={executionFactsStore.successFactUpdate}
                            performCreateExecutionFact={(createDro => {
                                return performCreateExecutionFact(createDro).then(() => {
                                    setState((oldState) => {
                                        return {
                                            ...oldState,
                                            saveWasPerformed: true
                                        }
                                    });
                                });
                            })}
                            performUpdateExecutionFact={((factId, updateDto) => {
                                const result = performUpdateExecutionFact(factId, updateDto);
                                result.then(() => {
                                    setState((oldState) => {
                                        return {
                                            ...oldState,
                                            updateWasPerformed: true
                                        }
                                    });
                                }).catch(() => { });
                                return result;
                            })}
                            originalFact={state.activeMode === pageModes.create ? blankExecutionFact : state.originalFact}
                            mode={state.activeMode}
                            backToViewMode={() => {
                                navigate(`${pageURLs[pages.executionFact]}/${state.originalFact.id}`);
                                setState((oldState) => {
                                    return {
                                        ...oldState,
                                        activeMode: getActualMode(pageModes.view)
                                    }
                                });
                            }}
                            errorsManipulatingExecutionFact={executionFactsStore.errorsManipulatingExecutionFact}
                        ></EditExecutionFact>
                    }
                </LocalizationProvider>
            </div>
            <div className={classes.backButton}>
                <Button onClick={() => {
                    navigate(pageURLs[pages.executionFactsList]);
                }}>{formatMessage({ id: 'back' })}</Button>
            </div>
            <Snackbar
                open={state.updateWasPerformed && executionFactsStore.successFactUpdate}
                onClose={() => {
                    setState((oldState) => {
                        return {
                            ...oldState,
                            updateWasPerformed: false
                        }
                    });
                }}
                autoHideDuration={3000}
                message={formatMessage({ id: 'update.fact' })}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
            <Snackbar
                open={state.saveWasPerformed && executionFactsStore.saveFactResult.success}
                onClose={() => {
                    setState((oldState) => {
                        return {
                            ...oldState,
                            saveWasPerformed: false
                        }
                    });
                }}
                autoHideDuration={3000}
                message={formatMessage({ id: 'create.fact' })}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
        </div >
    )
}

export default ExecutionFact;