import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Exercicio 3"', () => {
  it('Renderize um h2 com o texto "About Pokédex', () => {
    const { getByRole } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Favorite pokémons');
  });

  it('Renderize todos pokemons favoritados', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    pokemons.forEach((__, idx) => {
      const image = queryAllByText((_, { className }) => className === 'pokemon');
      expect(image[idx]).toBeInTheDocument();
    });
  });

  it('Mensagem No favorite pokemon found, caso não tenha pokemons favoritados', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
