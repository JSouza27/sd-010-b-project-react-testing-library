import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Será avaliado se o arquivo teste FavoritePokemons.test.js contemplam
100% dos casos de uso criados pelo Stryker`, () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa 
  não tiver pokémons favoritos.
  Teste se é exibido todos os cards de pokémons favoritados.
  Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.`,
  () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonFavoritePokemons = getByText(/favorite pokémons/i);
    fireEvent.click(buttonFavoritePokemons);

    const favoritePokemonsTitle = getByText('No favorite pokemon found');
    expect(favoritePokemonsTitle.textContent).toBe('No favorite pokemon found');
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[4], pokemons[0]] } />,
    );

    const alakazam = getByText(/alakazam/i);
    const pikachu = getByText(/pikachu/i);
    expect(alakazam.textContent).toBe('Alakazam');
    expect(pikachu.textContent).toBe('Pikachu');
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const favoritePokemonsTitle = queryAllByText('More details');
    expect(favoritePokemonsTitle[0]).toBe(undefined);
  });
});
