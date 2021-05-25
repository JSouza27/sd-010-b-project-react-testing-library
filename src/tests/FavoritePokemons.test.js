import React from 'react';
import { render } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
// import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
