import Loading from 'components/Loading';
import Snackbar from 'components/Snackbar';
import Typography from 'components/Typography';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useSelector } from "react-redux";
import ExecutionFactCard from './ExecutionFactCard';


const getClasses = createUseStyles({
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

function ExecutionFactsList({
    deleteExecutionFact, // parameter factId
}) {
    const classes = getClasses();
    const executionFactsStore = useSelector(({ executionFacts }) => executionFacts);
    const { formatMessage } = useIntl();
    return (<>
        <div className={classes.factsContainer}>
            {executionFactsStore.isLoadingExecutionFacts &&
                <div style={{ position: "absolute", width: '100%', height: '100%', zIndex: '1' }}>
                    <Loading></Loading>
                </div>
            }
            {executionFactsStore.filteredExecutionFactsDto.executionFacts.length === 0 &&
                <Typography>
                    {formatMessage({ id: 'facts.list.noItems' })}
                </Typography>}
            {executionFactsStore.filteredExecutionFactsDto.executionFacts.map((fact) => (
                <ExecutionFactCard
                    key={fact.id}
                    executionFact={fact}
                    deleteExecutionFact={deleteExecutionFact}
                    hasPendingDelete={executionFactsStore.hasPendingDelete}
                ></ExecutionFactCard>
            ))}
            <Snackbar
                open={executionFactsStore.errorsFetchingFactsByFilterMessage !== undefined}
                message={executionFactsStore.errorsFetchingFactsByFilterMessage}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
        </div>
    </>);
}

export default ExecutionFactsList;