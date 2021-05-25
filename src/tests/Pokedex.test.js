import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRoute from './renderWithRoute';
import App from '../App';

test('Testando se renderiza o texto "Encountered pokémons" na tela', () => {
  const { getByRole } = renderWithRoute(<App />);

  const heading = getByRole('heading', {
    level: 2,
  });

  expect(heading).toHaveTextContent('Encountered pokémons');
});

test('Testando se renderiza o pokemon um a um quando o botão é clicado', () => {
  const { getByRole, getByText } = renderWithRoute(<App />);

  const button = getByRole('button', {
    name: 'Próximo pokémon',
  });

  fireEvent.click(button);

  const charmander = getByText('Charmander');

  expect(charmander).toBeInTheDocument();

  fireEvent.click(button);

  const caterpie = getByText('Caterpie');

  expect(caterpie).toBeInTheDocument();

  fireEvent.click(button);

  const ekans = getByText('Ekans');

  expect(ekans).toBeInTheDocument();

  fireEvent.click(button);

  const alakazam = getByText('Alakazam');

  expect(alakazam).toBeInTheDocument();

  fireEvent.click(button);

  const mew = getByText('Mew');

  expect(mew).toBeInTheDocument();

  fireEvent.click(button);

  const rapidash = getByText('Rapidash');

  expect(rapidash).toBeInTheDocument();

  fireEvent.click(button);

  const snorlax = getByText('Snorlax');

  expect(snorlax).toBeInTheDocument();

  fireEvent.click(button);

  const dragonair = getByText('Dragonair');

  expect(dragonair).toBeInTheDocument();
});
