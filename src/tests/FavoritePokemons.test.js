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
