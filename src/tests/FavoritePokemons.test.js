import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('se é exibido No favorite pokemon found quando não há favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const errorMessage = 'No favorite pokemon found';
    const target = getByText(errorMessage);

    expect(target).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const targetURLOne = '/pokemons/4'; // Charmander
    const targetURLTwo = '/pokemons/65'; // Alakazam
    const targetURLThree = '/pokemons/148'; // Dragonair
    const goToFavorites = '/favorites';

    history.push(targetURLOne);
    const checkedToFavorite = getByText('Pokémon favoritado?');
    userEvent.click(checkedToFavorite);

    history.push(targetURLTwo);
    userEvent.click(checkedToFavorite);

    history.push(targetURLThree);
    userEvent.click(checkedToFavorite);

    history.push(goToFavorites);

    const pokemonOne = getByText('Charmander');
    const pokemonTwo = getByText('Alakazam');
    const pokemonThree = getByText('Dragonair');

    expect(pokemonOne).toBeInTheDocument();
    expect(pokemonTwo).toBeInTheDocument();
    expect(pokemonThree).toBeInTheDocument();
  });

  test('se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const findFavorites = getByText('Favorite pokémons');
    const noFavoritesMessage = getByText('No favorite pokemon found');

    expect(findFavorites).toBeInTheDocument();
    expect(noFavoritesMessage).toBeInTheDocument();
  });
});
