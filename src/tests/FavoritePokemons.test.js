import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<App />, '/favorites');

    const noPokemonFound = getByText('No favorite pokemon found');

    expect(noPokemonFound).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);

    const favoritePokemon = getByText('Pokémon favoritado?');
    userEvent.click(favoritePokemon);

    const linkFavorites = getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorites);

    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
})