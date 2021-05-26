import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

it('"No favorite pokemon found" is displayed, if does not have favorite pokemon.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const notFoundFavorite = getByText(/No favorite pokemon found/);
  expect(notFoundFavorite).toBeInTheDocument();
});
// it('if all favorite Pokémon cards are displayed.', () => {
//   const { getByText, queryAllByAltText } = renderWithRouter(<FavoritePokemons />);
//   fireEvent.click(getByText('More details'));
//   fireEvent.click(getByText(/Pokemon favoritado?/i));
//   fireEvent.click(getByText(/Favorite pokémons/i));
//   const favoritePokemons = queryAllByAltText(/is marked as favorite/i).length;
//   expect(favoritePokemons).toBe(1);
// }); /* Perguntar por que está dando erro na linha 13 */
it('no pokemon card is displayed, if it is not favored.', () => {
  const { queryAllByAltText } = renderWithRouter(<FavoritePokemons />);

  const noFavoritePokemons = queryAllByAltText(/is marked as favorite/i).length;
  expect(noFavoritePokemons).toBe(0);
});
