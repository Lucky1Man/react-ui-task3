import Typography from 'components/Typography';
import useTheme from 'misc/hooks/useTheme';
import { createUseStyles } from 'react-jss';
import Fab from 'components/Fab';
import Edit from 'components/icons/Edit';
import { useIntl } from 'react-intl';

const getClasses = createUseStyles((theme) => ({
    propertyContainer: {
        padding: `${theme.spacing(1)}px`,
    },
    propertyName: {
        color: theme.typography.color.info,
    },
    factContainer: {
        position: 'relative'
    },
    editButton: {
        position: 'absolute',
        right: '0px',
        top: '0px'
    }
}));

function ExecutionFact({
    originalFact,
    toEditMode
}) {
    const { theme } = useTheme();
    const classes = getClasses({ theme });
    const { formatMessage } = useIntl();
    return (
        <div>
            <div className={classes.propertyContainer}>
                <Typography variant='title'><span className={classes.propertyName}>{formatMessage({id: 'fact.id'})}</span>{originalFact.id}</Typography>
            </div>
            <div className={classes.propertyContainer}>
                <Typography variant='title'><span className={classes.propertyName}>{formatMessage({id: 'fact.description'})}</span>{originalFact.description}</Typography>
            </div>
            <div className={classes.propertyContainer}>
                <Typography variant='title'><span className={classes.propertyName}>{formatMessage({id: 'fact.startTime'})}</span>{originalFact.startTime}</Typography>
            </div>
            <div className={classes.propertyContainer}>
                <Typography variant='title'><span className={classes.propertyName}>{formatMessage({id: 'fact.finishTime'})}</span>{originalFact.finishTime}</Typography>
            </div>
            <div className={classes.propertyContainer}>
                <>
                    <Typography variant='title'><span className={classes.propertyName}>{formatMessage({id: 'fact.executor'})}</span></Typography>
                    <Typography variant='subtitle'><span className={classes.propertyName}>{formatMessage({id: 'executor.id'})}</span>{originalFact.executor.id}</Typography>
                    <Typography variant='subtitle'><span className={classes.propertyName}>{formatMessage({id: 'executor.fullName'})}</span>{originalFact.executor.fullName}</Typography>
                    <Typography variant='subtitle'><span className={classes.propertyName}>{formatMessage({id: 'executor.email'})}</span>{originalFact.executor.email}</Typography>
                </>
            </div>
            <div className={classes.editButton}>
                <Fab
                    color={'warning'}
                    onClick={() => toEditMode()}
                >
                    <Edit color='rgba(255, 255, 255, 1)'></Edit>
                </Fab>
            </div>
        </div>
    )
}

export default ExecutionFact;