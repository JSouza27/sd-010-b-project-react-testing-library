import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

test('Testa o componente pokemon Details ', () => {
  const { name, summary } = data[0];
  const { getByText, getByRole } = renderWithRouter(<App />);
  const getLink = getByRole('link', { name: /more details/i });
  userEvent.click(getLink);

  const getPokemonName = getByRole('heading', { name: `${name} Details`, level: 2 });
  expect(getPokemonName).toBeInTheDocument();
  expect(getLink).not.toBeInTheDocument();

  const summaryPokemon = getByRole('heading', { name: /summary/i, level: 2 });
  expect(summaryPokemon).toBeInTheDocument();

  const getPokemonSpecify = getByText(`${summary}`);
  expect(getPokemonSpecify);
});

test('Testa se existe na página uma seção com mapas', () => {
  const { name, foundAt } = data[0];
  const { getByText, getByRole, container, getAllByAltText } = renderWithRouter(<App />);
  const getLink = getByRole('link', { name: /more details/i });
  userEvent.click(getLink);

  const total = foundAt.map((item) => item.location);

  const gameLocation = getByRole('heading',
    { name: `Game Locations of ${name}`, level: 2 });
  expect(gameLocation).toBeInTheDocument();
  const getDivLocation = container.querySelector('.pokemon-habitat');
  expect(getDivLocation.childElementCount).toEqual(total.length);
  foundAt.forEach((item) => {
    const elementP = getByText(item.location);
    expect(elementP).toBeInTheDocument();
    const imagePath = getAllByAltText(`${name} location`);
    expect(imagePath[0]).toBeInTheDocument();
  });
});
