import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
    <Router history={ historyMock }>
      { component }
    </Router>,
  );

  return {
    ...renderObject,
    history: historyMock,
  };
}

export default renderWithRouter;
