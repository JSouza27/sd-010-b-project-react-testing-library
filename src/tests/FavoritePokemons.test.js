import React from 'react';
// import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('É exibido a mensagem No favorite pokemon found, se não tiver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    pokemons.forEach((parameter, id) => {
      const img = queryAllByText((string,
        { className }) => className === 'favorite-pokemon');
      expect(img[id]).toBeInTheDocument();
    });
  });

  test('Nenhum card é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
