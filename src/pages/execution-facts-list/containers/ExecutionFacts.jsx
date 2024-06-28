import Fab from 'components/Fab';
import Snackbar from 'components/Snackbar';
import Add from 'components/icons/Add';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import ExecutionFactFilter from '../components/ExecutionFactFilter';
import ExecutionFactsList from '../components/ExecutionFactsList';
import { useNavigate } from "react-router-dom";
import * as pages from 'constants/pages';
import pageURLs from 'constants/pagesURLs';
import { useSelector } from 'react-redux';

const getClasses = createUseStyles({
    elementContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
    },
    factsContainer: {
        paddingTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        alignItems: 'flex-start',
    },
    addButton: {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        zIndex: '1'
    }
});

function ExecutionFacts({
    fetchExecutionFacts, // parameter filter = { executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize },
    deleteExecutionFact, // parameter factId
}) {
    const classes = getClasses();
    const [deletionWasPerformed, setDeletionWasPerformed] = useState(false);
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const executionFactsStore = useSelector(({ executionFacts }) => executionFacts);
    return (<>
        <div className={classes.elementContainer}>
            <ExecutionFactFilter fetchExecutionFacts={fetchExecutionFacts}></ExecutionFactFilter>
            <ExecutionFactsList
                deleteExecutionFact={(factId) => {
                    setDeletionWasPerformed(true)
                    return deleteExecutionFact(factId)
                }}
            ></ExecutionFactsList>
            <Snackbar
                open={deletionWasPerformed && executionFactsStore.successDelete}
                onClose={() => {
                    setDeletionWasPerformed(false)
                }}
                autoHideDuration={3000}
                message={formatMessage({ id: 'delete.fact.success.message' })}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
            <div className={classes.addButton}>
                <Fab
                    color={'warning'}
                    onClick={() => {
                        navigate(pageURLs[pages.executionFact]);
                    }}
                >
                    <Add color='rgba(255, 255, 255, 1)'></Add>
                </Fab>
            </div>
        </div>

    </>);
}

export default ExecutionFacts;