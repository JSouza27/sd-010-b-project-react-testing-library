import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

const renderWithRouter = (componentToRender) => {
  const history = createMemoryHistory();

  return {...render(
    <Router history={ history }>
      { componentToRender }
    </Router>,
  ), history
  };
};

export default renderWithRouter;