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

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const [pikachu] = pokemons;
    const { getByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [pikachu] } />,
    );

    const randomPokemonName = getByTestId('pokemon-name');
    const randomPokemonType = getByTestId('pokemon-type');
    const randomPokemonWeight = getByTestId('pokemon-weight');
    expect(randomPokemonName).not.toHaveTextContent(/^charmander$/i);
    expect(randomPokemonType).not.toHaveTextContent(/^fire$/i);
    expect(randomPokemonWeight).not.toHaveTextContent(/^average weight: 8.5 kg$/i);
  });
});
/*
*/
