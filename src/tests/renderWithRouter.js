// isso aqui vai ser um HELPER.
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory(); // Essa função faz ser criado um histórico do zero.Aí jogo nessa variável. Depois vou jogar essa variável como parâmetro do Router.
  return {
    ...render(
      <MemoryRouter history={ history }>
        {component}
      </MemoryRouter>,
    ),
    history, // isso aqui é fundamental
  };
};

export default renderWithRouter;
