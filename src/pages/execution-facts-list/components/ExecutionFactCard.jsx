import chroma from "chroma-js";
import Button from 'components/Button';
import Card from 'components/Card';
import Dialog from 'components/Dialog';
import IconButton from 'components/IconButton';
import Link from 'components/Link';
import Typography from 'components/Typography';
import Delete from 'components/icons/Delete';
import { executionFact as executionFactPage } from 'constants/pages';
import pagesURLs from 'constants/pagesURLs';
import useTheme from 'misc/hooks/useTheme';
import { useState } from "react";
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useSelector } from "react-redux";

const getClasses = createUseStyles((theme) => ({
    factCardContainer: {
        position: 'relative',
        margin: `${theme.spacing(0.4)}px`,
        width: '320px',
    },
    factContainer: {
        paddingLeft: `${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(2)}px`
    },
    factDescription: {
        marginTop: `${theme.spacing(1)}px`,
        position: 'relative',
        width: '300px',
        maxHeight: '38px',
        overflow: 'hidden'
    },
    factTextOverflowDecoration: {
        width: '50px',
        height: '20px',
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        background: (props) => `linear-gradient(
            90deg, 
            ${props.cardBackgroundColor.slice(-props.cardBackgroundColor.length, -2) + '0)'} 0%, 
            ${props.cardBackgroundColor.slice(-props.cardBackgroundColor.length, -2) + '0.8687850140056023)'} 50%, 
            ${props.cardBackgroundColor.slice(-props.cardBackgroundColor.length, -2) + '1)'} 100%)`,
        color: 'transparent'
    },
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    deleteFactDialogMessage: {
        padding: `${theme.spacing(1)}px`,
        textAlign: 'center'
    },
    deleteFactDialogActions: {
        padding: `${theme.spacing(1)}px`,
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

function ExecutionFactCard({
    executionFact: fact,
    deleteExecutionFact,  // parameter factId,
    hasPendingDelete
}) {
    const { formatMessage } = useIntl();
    const { theme } = useTheme();
    const [state, setState] = useState({
        isHovered: false,
        isDeleteDialogOpened: false,
        isSelectedForDeletion: false
    });
    const cardBackgroundColor = state.isSelectedForDeletion ? 'rgba(222, 81, 62, 1)' : chroma(theme.card.color.background.paper).css('rgba');
    const { successDelete } = useSelector(({ executionFacts }) => executionFacts);
    const classes = getClasses({ theme, cardBackgroundColor });

    return (
        <>
            <Link
                key={fact.id}
                to={{
                    pathname: pagesURLs[executionFactPage] + `/${fact.id}`,
                }}
            >
                <div
                    className={`${classes.factCardContainer}`}
                    onMouseOver={() => {
                        setState({ ...state, isHovered: true });
                    }}
                    onMouseOut={() => {
                        setState({ ...state, isHovered: false });
                    }}
                >
                    <Card variant="outlined" customBackground={cardBackgroundColor}>
                        <div className={classes.factContainer}>
                            <div>
                                <Typography variant='title'>{formatMessage({ id: 'fact.card.executorTitle' })}</Typography>
                                <Typography>{fact.executorFullName}</Typography>
                            </div>
                            <div className={classes.factDescription}>
                                <Typography>{formatMessage({ id: 'fact.card.description' })}</Typography>
                                <Typography>{fact.description}</Typography>
                                <div className={classes.factTextOverflowDecoration}></div>
                            </div>
                        </div>
                    </Card>
                    {state.isHovered &&
                        <div className={classes.deleteIcon}>
                            <IconButton onClick={(event) => {
                                setState({
                                    ...state,
                                    isDeleteDialogOpened: true,
                                    isSelectedForDeletion: true
                                });
                                event.preventDefault();
                                event.stopPropagation();
                            }}><Delete /></IconButton>
                        </div>
                    }
                </div>
            </Link>
            <Dialog
                open={state.isDeleteDialogOpened}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') {
                        setState({ ...state, isDeleteDialogOpened: false, isHovered: false, isSelectedForDeletion: false })
                    }
                }}
            >
                <div className={classes.deleteFactDialogMessage}>
                    <Typography>{formatMessage({ id: 'delete.fact.message' })}</Typography>
                    {!successDelete && <Typography color={'error'}>{formatMessage({ id: 'delete.fact.error' })}</Typography>}
                </div>

                <div className={classes.deleteFactDialogActions}>
                    <Button onClick={() => setState({
                        ...state,
                        isDeleteDialogOpened: false,
                        isSelectedForDeletion: false,
                        isHovered: false
                    })}>
                        {formatMessage({ id: 'delete.fact.cancel.message' })}
                    </Button>
                    <Button isLoading={hasPendingDelete} colorVariant='secondary' onClick={() => {
                        deleteExecutionFact(fact.id);
                    }}>
                        {formatMessage({ id: 'delete.fact.submit.message' })}
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default ExecutionFactCard;