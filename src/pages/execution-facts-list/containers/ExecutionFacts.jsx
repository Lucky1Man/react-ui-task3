import Fab from 'components/Fab';
import Snackbar from 'components/Snackbar';
import Add from 'components/icons/Add';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import ExecutionFactFilter from '../components/ExecutionFactFilter';
import ExecutionFactsList from '../components/ExecutionFactsList';

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
    const [deletionWasPerformed, setDeletionWasPerformed] = useState(undefined);
    const { formatMessage } = useIntl();
    return (<>
        <div className={classes.elementContainer}>
            <ExecutionFactFilter fetchExecutionFacts={fetchExecutionFacts}></ExecutionFactFilter>
            <ExecutionFactsList
                deleteExecutionFact={(factId) => {
                    return deleteExecutionFact(factId)
                        .then((response) => {
                            setDeletionWasPerformed(factId);
                            return Promise.resolve(response);
                        })
                }}
            ></ExecutionFactsList>
            <Snackbar
                open={deletionWasPerformed !== undefined}
                onClose={() => {
                    setDeletionWasPerformed(undefined)
                }}
                autoHideDuration={3000}
                message={formatMessage({ id: 'delete.fact.success.message' })}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
            <div className={classes.addButton}>
                <Fab color={'warning'}>
                    <Add color='rgba(255, 255, 255, 1)'></Add>
                </Fab>
            </div>
        </div>

    </>);
}

export default ExecutionFacts;