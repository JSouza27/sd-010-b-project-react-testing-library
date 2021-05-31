import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/favorites');

    const textFavorite = getByText('No favorite pokemon found');

    expect(textFavorite).toBeInTheDocument();
  });
});
