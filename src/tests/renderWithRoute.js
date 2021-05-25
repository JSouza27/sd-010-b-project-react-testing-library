import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

const renderWithRoute = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Route history={ history }>{ component }</Route>), history,
  });
};

export default renderWithRoute;
// Código feito pela Maite;
