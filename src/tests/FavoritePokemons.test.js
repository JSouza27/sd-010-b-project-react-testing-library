import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Verifica se a mensagem e mostrada quando nao a favorito', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const message = getByText(/No favorite pokemon found/i);
  expect(message).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByRole, getByLabelText } = renderWithRouter(<App />);
  const moreDelails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDelails);
  const favorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(favorite);
  const { getByTestId } = render(<FavoritePokemons />);
  const favoritePokemon = getByTestId('pokemon-name');
  expect(favoritePokemon).toBeInTheDocument();
});

test('Teste se nenhum card é exibido, se não favorito', () => {
  const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
  const pokemonName = queryByTestId('pokemon-name');
  expect(pokemonName).not.toBeInTheDocument();
});
