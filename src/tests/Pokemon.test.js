import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
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
    expect(pokemonImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const navigationLink = getByText(/more details/i);
    expect(navigationLink.pathname).toBe('/pokemons/25');
    fireEvent.click(navigationLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if pokemon is favorited', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/more details/i);
    fireEvent.click(moreDetailsButton);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    const favoritedPokemon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoritedPokemon).toBeInTheDocument();
    expect(favoritedPokemon).toHaveAttribute('src', '/star-icon.svg');
    const home = getByText('Home');
    fireEvent.click(home);
    const favoritedPokemon2 = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoritedPokemon2).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritedPokemon2).toBeInTheDocument();
    const moreDetailsButton2 = getByText(/more details/i);
    fireEvent.click(moreDetailsButton2);
    // const checkbox2 = getByRole('checkbox');
    // fireEvent.click(checkbox2); acho que no fim não precisava desse botão, era o moreDetailsButton2 que precisava ser criado mesmo
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(favoritedPokemon).not.toBeInTheDocument();
    expect(favoritedPokemon2).not.toBeInTheDocument();
  });
  // teste final com aumento de complexidade com ajuda de Henrique Clementino
});
