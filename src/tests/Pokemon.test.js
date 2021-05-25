import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing pokemon card component', () => {
  const moreDetails = 'More details';

  it('check if the informations of the initial pokemon are from pikachu', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemon-type');
    const weightPokemon = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();

    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src');
    expect(pokemonImg).toHaveAttribute('alt');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Check if there is a link to details of the pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkDetails = getByRole('link', {
      name: moreDetails,
    });

    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveTextContent(moreDetails);

    userEvent.click(linkDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Check the favorite image of the pokemon', () => {
    const {
      getByAltText,
      getByLabelText,
      getByRole,
      history,
    } = renderWithRouter(<App />);
    const linkDetails = getByRole('link', {
      name: moreDetails,
    });

    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritePokemon = getByLabelText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    const goldenStar = getByAltText('Pikachu is marked as favorite');
    expect(goldenStar).toBeInTheDocument();
    expect(goldenStar.src).toBe('http://localhost/star-icon.svg');
  });
});
