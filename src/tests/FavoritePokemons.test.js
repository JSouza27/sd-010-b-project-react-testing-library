import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testando a pagina de pokemons favoritos', () => {
  it('Deve mosntrar a mensagem se não existir um Pokemon favorito', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');

    localStorage.setItem('favoritePokemonIds', '');

    expect(message).toBeInTheDocument();
  });
  it('Should renderizar toddos os pokomons favoritos', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const pokemonsCards = getAllByTestId('pokemon-name');

    expect(pokemonsCards.length).toBe(pokemons.length);
  });
  it('Deve mostrar apenas os pokemons favoritos', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const notFoundMessage = getByText('No favorite pokemon found');

    expect(notFoundMessage).toBeInTheDocument();
  });
});
