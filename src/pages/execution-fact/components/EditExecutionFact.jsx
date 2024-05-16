import Button from 'components/Button';
import DateTimePicker from 'components/DateTimePicker';
import TextField from 'components/TextField';
import Typography from 'components/Typography';
import * as pages from 'constants/pages';
import pageURLs from 'constants/pagesURLs';
import { compareDesc } from 'date-fns';
import useTheme from 'misc/hooks/useTheme';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from "react-router-dom";

const getClasses = createUseStyles((theme) => ({
    propertyContainer: {
        padding: `${theme.spacing(1)}px`,
    },
    actions: {
        marginTop: `${theme.spacing(1)}px`,
        display: 'flex',
        justifyContent: 'space-around'
    },
    timeRangeError: {
        padding: `${theme.spacing(1)}px`,
    }
}));

const pageModes = {
    edit: 'edit',
    create: 'create'
}

const errorTypes = {
    DESCRIPTION_LENGTH: 'DESCRIPTION_LENGTH',
    START_TIME_AFTER_FINISH_TIME: 'START_TIME_AFTER_FINISH_TIME',
    EXECUTOR_ID_REQUIRED: 'EXECUTOR_ID_REQUIRED'
};

const initialState = (originalFact) => ({
    originalFact: originalFact,
    startTime: new Date(originalFact.startTime),
    finishTime: new Date(originalFact.finishTime),
    description: originalFact.description,
    executorId: originalFact.executor.id,
    validationErrors: [],
    saveWasMade: false,
    updateWasMade: false
});

function ExecutionFact({
    originalFact,
    mode = pageModes.create,
    backToViewMode = () => { },
    performCreateExecutionFact, //param createDto {executorId, description, startTime, finishTime}
    performUpdateExecutionFact, //param factId, updateDto {executorId, description, startTime, finishTime}
    isSavingExecutionFact,
    isUpdatingExecutionFact,
    saveSuccess,
    updateSuccess,
    errorsManipulatingExecutionFact
}) {
    const [state, setState] = useState(initialState(originalFact));
    if (state.saveWasMade && saveSuccess) {
        backToViewMode();
    } else if (state.updateWasMade && updateSuccess) {
        backToViewMode();
    }
    useEffect(() => {
        setState({
            ...state,
            originalFact: originalFact,
            startTime: new Date(originalFact.startTime),
            finishTime: new Date(originalFact.finishTime),
            description: originalFact.description,
            executorId: originalFact.executor.id,
            saveWasMade: false,
            updateWasMade: false
        });
    }, [originalFact])
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const getValidationErrors = () => {
        const errors = [];
        if (state.description.length === 0 || state.description.length > 500) {
            errors.push(errorTypes.DESCRIPTION_LENGTH);
        }
        if (compareDesc(state.startTime, state.finishTime) === -1) {
            errors.push(errorTypes.START_TIME_AFTER_FINISH_TIME);
        }
        if (state.executorId.length === 0 || state.executorId === '') {
            errors.push(errorTypes.EXECUTOR_ID_REQUIRED);
        }
        return errors;
    };

    return (
        <div>
            {mode === pageModes.edit &&
                <div className={classes.propertyContainer}>
                    <Typography variant='title'>{formatMessage({ id: 'fact.id' })}{state.originalFact.id}</Typography>
                </div>
            }
            <div className={classes.propertyContainer}>
                <TextField
                    label={formatMessage({ id: 'fact.newDescription' })}
                    value={state.description}
                    helperText={
                        state.validationErrors.includes(errorTypes.DESCRIPTION_LENGTH) ?
                            <Typography color='error'>{formatMessage({ id: `error.${errorTypes.DESCRIPTION_LENGTH}` })}</Typography> :
                            `${formatMessage({ id: 'fact.oldDescription' })}${state.originalFact.description}`
                    }
                    onChange={({ target }) => {
                        setState({
                            ...state,
                            description: target.value
                        });
                    }}
                ></TextField>
            </div>
            <div className={classes.propertyContainer}>
                <DateTimePicker
                    ampm={false}
                    onChange={(value) => {
                        setState({
                            ...state,
                            startTime: value
                        });
                    }}
                    label={formatMessage({ id: 'fact.newStartTime' })}
                    disableFuture={true}
                    defaultValue={state.startTime}
                />
            </div>
            {state.validationErrors.includes(errorTypes.START_TIME_AFTER_FINISH_TIME) &&
                <div className={classes.timeRangeError}>
                    <Typography color='error'>{formatMessage({ id: `error.${errorTypes.START_TIME_AFTER_FINISH_TIME}` })}</Typography>
                </div>
            }
            <div className={classes.propertyContainer}>
                <DateTimePicker
                    ampm={false}
                    onChange={(value) => {
                        setState({
                            ...state,
                            finishTime: value
                        });
                    }}
                    label={formatMessage({ id: 'fact.newFinishTime' })}
                    disableFuture={true}
                    defaultValue={state.finishTime}
                />
            </div>
            <div className={classes.propertyContainer}>
                <TextField
                    label={formatMessage({ id: 'fact.newExecutor.id' })}
                    value={state.executorId}
                    helperText={
                        state.validationErrors.includes(errorTypes.EXECUTOR_ID_REQUIRED) ?
                            <Typography color='error'>{formatMessage({ id: `error.${errorTypes.EXECUTOR_ID_REQUIRED}` })}</Typography> :
                            `${formatMessage({ id: 'fact.oldExecutor.id' })}${state.originalFact.executor.id}`
                    }
                    onChange={({ target }) => {
                        setState({
                            ...state,
                            executorId: target.value
                        });
                    }}
                ></TextField>
            </div>
            <div className={classes.actions}>
                {mode === pageModes.create &&
                    <>
                        <Button
                            isLoading={isSavingExecutionFact}
                            onClick={() => {
                                const errors = getValidationErrors();
                                if (errors.length === 0) {
                                    performCreateExecutionFact({
                                        description: state.description !== state.originalFact.description ? state.description : undefined,
                                        startTime: state.startTime !== state.originalFact.startTime ? state.startTime : undefined,
                                        finishTime: state.finishTime !== state.originalFact.finishTime ? state.finishTime : undefined,
                                        executorId: state.executorId !== state.originalFact.executor.id ? state.executorId : undefined,
                                    });
                                    setState({
                                        ...state,
                                        validationErrors: [],
                                        saveWasMade: true
                                    });
                                } else {
                                    setState({
                                        ...state,
                                        validationErrors: errors
                                    });
                                }
                            }}>{formatMessage({ id: 'create' })}</Button>
                        <Button onClick={() => {
                            navigate(pageURLs[pages.executionFactsList]);
                        }}>{formatMessage({ id: 'cancel' })}</Button>
                    </>
                }
                {mode === pageModes.edit &&
                    <>
                        <Button
                            isLoading={isUpdatingExecutionFact}
                            onClick={() => {
                                const errors = getValidationErrors();
                                if (errors.length === 0) {
                                    performUpdateExecutionFact(state.originalFact.id, {
                                        description: state.description !== state.originalFact.description ? state.description : undefined,
                                        startTime: state.startTime !== state.originalFact.startTime ? state.startTime : undefined,
                                        finishTime: state.finishTime !== state.originalFact.finishTime ? state.finishTime : undefined,
                                        executorId: state.executorId !== state.originalFact.executor.id ? state.executorId : undefined,
                                    });
                                    setState({
                                        ...state,
                                        validationErrors: [],
                                        updateWasMade: true
                                    });
                                } else {
                                    setState({
                                        ...state,
                                        validationErrors: errors
                                    });
                                }
                            }}>{formatMessage({ id: 'save' })}</Button>
                        <Button onClick={() => {
                            backToViewMode();
                        }}>{formatMessage({ id: 'cancel' })}</Button>
                    </>
                }
            </div>
            {errorsManipulatingExecutionFact !== undefined && (state.saveWasMade || state.updateWasMade) &&
                <Typography color='error'>{errorsManipulatingExecutionFact}</Typography>
            }
        </div>
    )
}

export default ExecutionFact;