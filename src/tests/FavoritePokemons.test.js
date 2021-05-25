import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

describe('Favorite Page', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('favorites');
    const noStar = getByText('No favorite pokemon found');
    expect(noStar).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const star = getByText(/Pokémon favoritado?/i);
    fireEvent.click(star);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const poke = getByText(/Pikachu/i);
    expect(poke).toBeInTheDocument();
  });
});
