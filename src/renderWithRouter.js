import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = component => {
  const history = createMemoryHistory();
  const renderedObject = render(
    <Router history={ history }>
      { component }
    </Router>
  );

  return ({
    ...renderedObject,
    history
  });
};

export default renderWithRouter;
