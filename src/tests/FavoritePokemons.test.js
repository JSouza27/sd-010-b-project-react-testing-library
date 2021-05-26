import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Testa mensagem No favorite pokemon found quando nao tem favorito `', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const message = getByText(/No favorite pokemon found/i);
  expect(message).toBeInTheDocument();
});

test('Testa se é exibido cards de favorito `', () => {
  const { getByRole, getByLabelText } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const favorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(favorite);
  const { getByTestId } = render(<FavoritePokemons />);
  const favoritePokemon = getByTestId('pokemon-name');
  expect(favoritePokemon).toBeInTheDocument();
});

test('Testa se nenhum card é exibido se nao for favorito `', () => {
  const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
  const pokemonName = queryByTestId('pokemon-name');
  expect(pokemonName).not.toBeInTheDocument();
});
