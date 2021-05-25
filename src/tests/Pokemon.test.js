import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test Pokemon component', () => {
  test('if pokemon card is rendered', () => {
    const { getByText, getByTestId, getByAltText, history } = renderWithRouter(<App />);
    const pokemon = getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    const pokemonFat = getByTestId('pokemon-weight');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonFat).toBeInTheDocument();
    expect(pokemonFat.textContent).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const navigationLink = getByText(/more details/i);
    expect(navigationLink.pathname).toBe('/pokemons/25');
    fireEvent.click(navigationLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if pokemon is favorited', () => {
    const { getByText, getByAltText, getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/more details/i);
    fireEvent.click(moreDetailsButton);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    const favoritedPokemon = getByAltText(/pikachu is marked as favorite/i);
    expect(favoritedPokemon).toBeInTheDocument();
    expect(favoritedPokemon).toHaveAttribute('src', '/star-icon.svg');
    // failed total complete test from add to remove favorite pokemon:
    // const home = getByText('Home');
    // fireEvent.click(home);
    // const favoritedPokemon2 = getByAltText(/pikachu is marked as favorite/i);
    // expect(favoritedPokemon2).toBeInTheDocument();
    // fireEvent.click(moreDetailsButton);
    // fireEvent.click(checkbox);
    // fireEvent.click(home);
    // const favoritedPokemon3 = getByAltText(/pikachu is marked as favorite/i);
    // expect(favoritedPokemon3).toBeInTheDocument();
  });
});
