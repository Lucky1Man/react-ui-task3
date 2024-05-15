import { createContext, useState } from 'react';

const defaultFilter = {
    executorEmail: undefined,
    fromFinishTime: undefined,
    toFinishTime: undefined,
    description: undefined,
    pageIndex: 0,
    pageSize: 18
}

export const FactFilterContext = createContext();

const ExecutionFactFilterProvider = ({
    children,
}) => {
    const [filter, setFilter] = useState(defaultFilter);
    return (
        <FactFilterContext.Provider
            value={{
                filter,
                defaultFilter,
                setFilter
            }}
        >
            {children}
        </FactFilterContext.Provider>
    );
};

export default ExecutionFactFilterProvider;