import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test if a card with the information of a certain Pokémon is rendered', () => {
  test('The correct information of the Pokémon should be shown on the screen', () => {
    const { getByRole, getByText, getAllByText } = renderWithRouter(<App />);
    const buttonPoison = getByRole('button', {
      name: /^poison$/i,
    });
    userEvent.click(buttonPoison);
    const pokemonName = getByText('Ekans');
    const pokemonType = getAllByText('Poison');
    const pokemonWeight = getByText('Average weight: 6.9 kg');
    const pokemonImage = getByRole('img');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType[0]).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      'alt', 'Ekans sprite',
    );
  });
  describe('test the functionality related to the link', () => {
    test('test if the card has a "more details" link', () => {
      const { getByRole } = renderWithRouter(<App />);
      const linkMoreDetails = getByRole('link', {
        name: /^more details$/i,
      });
      expect(linkMoreDetails).toBeInTheDocument();
    });
    test('Clicking on the link takes you to the page for more details', () => {
      const { getByRole } = renderWithRouter(<App />);
      const buttonPoison = getByRole('button', {
        name: /^poison$/i,
      });
      userEvent.click(buttonPoison);
      const buttonMoreDetails = getByRole('link', {
        name: /^more details$/i,
      });
      userEvent.click(buttonMoreDetails);
      const titleDetails = getByRole('heading', {
        level: 2,
        name: /^ekans details$/i,
      });
      expect(titleDetails).toBeInTheDocument();
    });
    test('when clicking on the link the route must change', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const textDetails = getByText(/^more details$/i);
      userEvent.click(textDetails);
      // Pikachu
      expect(history.location.pathname).toBe('/pokemons/25');
    });
    test('Test if there is a star icon on favorite Pokemons', () => {
      const { getAllByRole, getByText, getByRole } = renderWithRouter(<App />);
      const textDetails = getByText(/^more details$/i);
      userEvent.click(textDetails);
      const checkFavorites = getByRole('checkbox');
      userEvent.click(checkFavorites);
      const images = getAllByRole('img');
      const imageStar = images[1];
      expect(imageStar).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
