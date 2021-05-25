import React from 'react';
import { fireEvent, waitFor } from '@testing-library/dom';
import renderWithRoute from './renderWithRoute';
import App from '../App';

test('Testando se renderiza o texto "Encountered pokémons" na tela', () => {
  const { getByRole } = renderWithRoute(<App />);

  const heading = getByRole('heading', {
    level: 2,
  });

  expect(heading).toHaveTextContent('Encountered pokémons');
});

test('Testa se renderiza os butões', () => {
  const { getAllByTestId, getByRole } = renderWithRoute(<App />);

  const buttonAll = getByRole('button', {
    name: 'All',
  });

  const buttonType = getAllByTestId('pokemon-type-button');

  expect(buttonAll).toHaveTextContent('All');
  expect(buttonType[0]).toHaveTextContent('Electric');
  expect(buttonType[1]).toHaveTextContent('Fire');
  expect(buttonType[2]).toHaveTextContent('Bug');
  expect(buttonType[3]).toHaveTextContent('Poison');
  expect(buttonType[4]).toHaveTextContent('Psychic');
  expect(buttonType[5]).toHaveTextContent('Normal');
  expect(buttonType[6]).toHaveTextContent('Dragon');
});

test('Testando se renderiza o pokemon um a um quando o botão é clicado', async () => {
  const { getByRole, getByText, getAllByRole } = renderWithRoute(<App />);

  const buttonProximo = getByRole('button', {
    name: 'Próximo pokémon',
  });

  fireEvent.click(buttonProximo);

  const charmander = getByText('Charmander');

  expect(charmander).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const caterpie = getByText('Caterpie');

  expect(caterpie).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const ekans = getByText('Ekans');

  expect(ekans).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const alakazam = getByText('Alakazam');

  expect(alakazam).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const mew = getByText('Mew');

  expect(mew).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const rapidash = getByText('Rapidash');

  expect(rapidash).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const snorlax = getByText('Snorlax');

  expect(snorlax).toBeInTheDocument();

  fireEvent.click(buttonProximo);

  const dragonair = getByText('Dragonair');

  expect(dragonair).toBeInTheDocument();
});
