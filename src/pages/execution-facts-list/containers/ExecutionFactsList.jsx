import { useEffect } from "react";
import { createUseStyles } from 'react-jss';
import { useSelector } from "react-redux";
import ExecutionFactCard from '../components/ExecutionFactCard';
import Loading from "components/Loading";

const defaultFilter = {
    pageIndex: 0,
    pageSize: 10
}

const getClasses = createUseStyles({
    factsContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

function ExecutionFactsList({
    fetchExecutionFacts, // parameter filter = { executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize },
    deleteExecutionFact, // parameter factId
}) {
    const classes = getClasses();
    useEffect(() => {
        fetchExecutionFacts(defaultFilter)
    }, [])
    const executionFactsStore = useSelector(({ executionFacts }) => executionFacts);
    return (<>
        {executionFactsStore.isLoadingExecutionFacts && <Loading></Loading>}
        <div className={classes.factsContainer}>
            {executionFactsStore.executionFactsList.map((fact) => (
                <ExecutionFactCard
                    key={fact.id}
                    executionFact={fact}
                    deleteExecutionFact={deleteExecutionFact}
                    hasPendingDelete={executionFactsStore.hasPendingDelete}
                ></ExecutionFactCard>
            ))}
        </div>
    </>);
}

export default ExecutionFactsList;