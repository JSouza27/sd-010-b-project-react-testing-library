import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Verifica o componente FavoritePokemons', () => {
  test('Verifica se existe mensagem quando não existe pokemon favorito', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Verifica se todos os cards de favoritos são exibidos', () => {
    const { getByText, queryAllByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/More details/i));
    userEvent.click(getByText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Favorite Pokémons/i));
    const cardList = queryAllByTestId('pokemon-name');
    expect(cardList.length > 0).toBe(true);
  });
  test('Verifica se nenhum card é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons />);
    const cardList = queryAllByTestId('pokemon-name');
    expect(cardList.length === 0).toBe(true);
  });
});
