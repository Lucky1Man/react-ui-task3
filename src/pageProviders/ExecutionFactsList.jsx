import * as authorities from 'constants/authorities';
import ExecutionFactsListPage from 'pages/execution-facts-list';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';

const ExecutionFactsList = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <ExecutionFactsListPage {...props} />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default ExecutionFactsList;
