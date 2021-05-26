import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

function renderWithMemoryRouter(component) {
  return ({
    ...render(<MemoryRouter>{component}</MemoryRouter>),
  });
}

export default renderWithMemoryRouter;
