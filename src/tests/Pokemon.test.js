import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 6 - Test the <Pokemon.js> component', () => {
  it('Tests if a card with the information of a certain Pokémon is rendered', () => {
    // Acessar componentes
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);

    // Manipular componentes
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const pokemonDetails = getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);

    // Testar componentes
    const pokemonName = getByText('Pikachu');
    const pokemonType = getByText('Electric');
    const pokemonWeigth = getByText('Average weight: 6.0 kg');
    const pokemonImage = getByAltText('Pikachu sprite');
    const pokemonImagePath = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeigth).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', pokemonImagePath);
  });

  it('', () => {

  });

  it('', () => {

  });

  it('', () => {

  });

  it('Tests if there is a star icon on favorite Pokémon.', () => {
    // Acessar componentes
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);

    // Manipular componentes
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const pokemonDetails = getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetails);
    const favoriteCheck = getByRole('checkbox', { type: 'checkbox', id: 'favorite' });
    userEvent.click(favoriteCheck);

    // Testar componentes
    const favoritePokemon = getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
