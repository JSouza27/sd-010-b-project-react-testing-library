import React from 'react';
import createMemoryHistory, { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const renderWithMemoryRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<MemoryRouter history={ history }>{component}</MemoryRouter>),
    history,
  };
};

export default renderWithMemoryRouter;
