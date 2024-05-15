import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Menu from 'components/Menu';
import MenuItem from "components/MenuItem";
import TextField from "components/TextField";
import Filter from 'components/icons/Filter';
import { useContext, useEffect, useState } from "react";
import { createUseStyles } from 'react-jss';
import { useSelector } from "react-redux";
import Pagination from '../components/Pagination';
import { FactFilterContext } from '../providers/ExecutionFactFilter';
import { useIntl } from 'react-intl';

const getClasses = createUseStyles({
    filterContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

function ExecutionFactsFilter({
    fetchExecutionFacts, // parameter filter = { executorEmail, fromFinishTime, toFinishTime, description, pageIndex, pageSize },
}) {
    const classes = getClasses();
    const { filter, defaultFilter, setFilter } = useContext(FactFilterContext);
    const executionFactsStore = useSelector(({ executionFacts }) => executionFacts);
    const { formatMessage } = useIntl();
    useEffect(() => {
        fetchExecutionFacts(filter)
    }, [fetchExecutionFacts, filter, executionFactsStore.hasPendingDelete]);
    const [state, setState] = useState({
        filterMenuRef: null,
        filterExecutorEmail: filter.executorEmail ?? '',
        filterDescription: filter.description ?? '',
        currentPage: 1
    });

    return (<>
        <div className={classes.filterContainer}>
            <IconButton onClick={(event) => {
                setState({ ...state, filterMenuRef: event.currentTarget })
            }}>
                <Filter />
            </IconButton>
            <Menu anchorEl={state.filterMenuRef} open={Boolean(state.filterMenuRef)} onClose={(event, reason) => {
                if (reason === "backdropClick") {
                    setState({
                        ...state,
                        filterMenuRef: null
                    })
                }
            }}>
                <MenuItem>
                    <div onKeyDown={(event) => event.stopPropagation()}> {
                    /*Fixes glitch. When I press button which represents character on which the given label for this TextField starts
                     the focus goes away from TextField in which that button was pressed.
                     The focus then goes to the TextField which has label with first character that is equal to entered one
                     The bug is present only when TextField, which label has first character which is the same as entered, is present in Menu > MenuItem hierarchy
                    */}
                        <TextField
                            label={formatMessage({ id: 'facts.filter.email.label' })}
                            value={state.filterExecutorEmail}
                            onChange={({ target }) => setState({
                                ...state,
                                filterExecutorEmail: target.value,
                            })}
                        />
                    </div>
                </MenuItem>
                <MenuItem>
                    <div onKeyDown={(event) => event.stopPropagation()}>
                        <TextField
                            label={formatMessage({ id: 'facts.filter.description.label' })}
                            value={state.filterDescription}
                            onChange={({ target }) => setState({
                                ...state,
                                filterDescription: target.value,
                            })}
                        />
                    </div>
                </MenuItem>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => {
                        const emailNotEmpty = state.filterExecutorEmail !== '';
                        const descriptionNotEmpty = state.filterDescription !== '';
                        setFilter({
                            ...filter,
                            executorEmail: emailNotEmpty ? state.filterExecutorEmail : undefined,
                            description: descriptionNotEmpty ? state.filterDescription : undefined,
                            pageIndex: emailNotEmpty || descriptionNotEmpty ? 0 : filter.pageIndex
                        });
                        setState({
                            ...state,
                            filterMenuRef: null,
                        });
                    }}>{formatMessage({ id: 'filter.apply' })}</Button>
                    <Button onClick={() => {
                        setFilter(defaultFilter);
                        setState({
                            ...state,
                            filterExecutorEmail: '',
                            filterDescription: '',
                            filterMenuRef: null,
                        });
                    }}>{formatMessage({ id: 'filter.clear' })}</Button>
                </div>
            </Menu>
            <Pagination
                count={executionFactsStore.filteredExecutionFactsDto.totalPages}
                onChange={(event, page) => {
                    setFilter({
                        ...filter,
                        pageIndex: page - 1
                    });
                }}
                page={filter.pageIndex + 1}
            />
        </div>


    </>);
}

export default ExecutionFactsFilter;