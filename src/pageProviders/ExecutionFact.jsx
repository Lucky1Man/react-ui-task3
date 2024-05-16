import * as authorities from 'constants/authorities';
import ExecutionFactPage from 'pages/execution-fact';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';

const ExecutionFact = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <ExecutionFactPage {...props} />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default ExecutionFact;
