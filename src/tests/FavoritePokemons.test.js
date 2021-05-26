import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Testando o componente <FavoritePokemons />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const [pikachu, charmander] = pokemons;
    const pokemonsTest = [pikachu, charmander];
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemonsTest } />,
    );

    const pokemonName = getAllByTestId('pokemon-name');
    const pokemonType = getAllByTestId('pokemon-type');
    const pokemonWeight = getAllByTestId('pokemon-weight');
    expect(pokemonName.length).toBe(2);
    expect(pokemonType.length).toBe(2);
    expect(pokemonWeight.length).toBe(2);
  });
});
/*
*/
