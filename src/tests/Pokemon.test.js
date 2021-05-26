import React from 'react';
import { screen, fireEvent } from '@testing-library/dom';
import RenderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('card with the information of a certain Pokémon.', () => {
  RenderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
  const pikachu = screen.getByTestId('pokemon-name');
  expect(pikachu).toHaveTextContent(/Pikachu/);

  const pikachuType = screen.getByTestId('pokemon-type');
  expect(pikachuType).toHaveTextContent(/Electric/);

  const pikachuWeight = screen.getByTestId('pokemon-weight');
  expect(pikachuWeight).toHaveTextContent(/Average weight: 6.0 kg/);

  const pikachuSprite = screen.getByAltText(/Pikachu sprite/);
  expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('The URL displayed in the browser changes to poke id', () => {
  const { history } = RenderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
  fireEvent.click(screen.getByText(/More details/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
test('Test if there is a star icon on favorite Pokémon.', () => {
  RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
  const pikachu = screen.getByAltText(/^Pikachu is marked as favorite$/);
  expect(pikachu).toHaveAttribute('src', '/star-icon.svg');
});
test('Contains a link to view details of Pokémon', () => {
  RenderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
  const moreDetails = screen.getByRole('link', { name: /^More details$/ });
  expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
});
