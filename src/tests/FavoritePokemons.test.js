import React from 'react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  const favorites = '/favorites';
  const moreDetails = 'More details';

  it('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(favorites);

    const textFavorite = getByText('No favorite pokemon found');

    expect(textFavorite).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    history.push('/');

    userEvent.click(getByText(moreDetails));
    const details = getByRole('heading', { level: 2, name: 'Summary' });
    expect(details).toBeInTheDocument();
    const favoritado = getByText('Pokémon favoritado?');
    userEvent.click(favoritado);
    history.push(favorites);
    const MoreDetails = getByText(moreDetails);
    expect(MoreDetails).toBeInTheDocument();
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    history.push('/');

    userEvent.click(getByText(moreDetails));
    const details = getByRole('heading', { level: 2, name: 'Summary' });
    expect(details).toBeInTheDocument();
    const favoritado = getByText('Pokémon favoritado?');
    userEvent.click(favoritado);
    history.push(favorites);
    const textFavorite = getByText('No favorite pokemon found');
    expect(textFavorite).toBeInTheDocument();
  });
});
