import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('Testa se informações detalhadas aparecem na tela', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const linkDetails = getByText(moreDetails);
  userEvent.click(linkDetails);
  const pokeDetails = getByText('Pikachu Details');
  expect(pokeDetails).toBeInTheDocument();
  expect(linkDetails).not.toBeInTheDocument();
  const heading = getByRole('heading', {
    level: 2,
    name: /Summary/i,
  });
  expect(heading).toBeInTheDocument();
  const infoText = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(infoText).toBeInTheDocument();
});

test('Testa se existe mapa na página', () => {
  const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
  const linkDetails = getByText(moreDetails);
  userEvent.click(linkDetails);
  const map = getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  });
  expect(map).toBeInTheDocument();

  const pokeLocation = getAllByAltText('Pikachu location');
  expect(pokeLocation).toHaveLength(2);
  expect(pokeLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(pokeLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const location1 = getByText(/Kanto Viridian Forest/i);
  expect(location1).toBeInTheDocument();
  const location2 = getByText(/Kanto Power Plant/i);
  expect(location2).toBeInTheDocument();
});

test('Teste para favoritar pokemon', () => {
  const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);
  const linkDetails = getByText(moreDetails);
  userEvent.click(linkDetails);

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();

  userEvent.click(checkbox);
  expect(checkbox.checked).toBeTruthy();

  userEvent.click(checkbox);
  expect(checkbox.checked).toBeFalsy();

  const favoriteLabel = getByLabelText('Pokémon favoritado?');
  expect(favoriteLabel).toBeInTheDocument();
});

// Source https://testing-library.com/docs/queries/byrole/
// Feito em parceria com Wellington Passo
