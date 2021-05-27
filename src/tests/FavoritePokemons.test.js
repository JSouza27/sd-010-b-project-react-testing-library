import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('tests the <FavoritePokemons /> component', () => {
  test('when the person does not have favorite Pokémon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
  test('if all favorite Pokémon cards are displayed', () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    // const message = getByText('No favorite pokemon found');
    // expect(message).not.toBeInTheDocument();
    const cards = queryAllByTestId('pokemon-name');
    expect(cards.length > 0).toBe(true);
  });
  test('if no Pokémon card is displayed, if it is not favored', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons />);
    const cards = queryAllByTestId('pokemon-name');
    expect(cards.length === 0).toBe(true);
  });
});
