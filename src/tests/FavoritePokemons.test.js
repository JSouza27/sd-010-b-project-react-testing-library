test('', () => {});
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Verifica se a URL /about renderizam a pagina about', () => {
  test('Verifica se ao clicar nos links renderisa o conteudo da pagina', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
})