import { useContext } from 'react';
import ExecutionFactFilterContext from '../providers/context/ExecutionFactFilterContext';

const useFilter = () => {
  return useContext(ExecutionFactFilterContext);
};

export default useFilter;