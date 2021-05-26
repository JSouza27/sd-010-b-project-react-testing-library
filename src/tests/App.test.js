import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa as 3 primeiras páginas', () => {
  it('testa rota Favorite Pokemons', () => {
    // renderiza o app
    const { history, getByText } = renderWithRouter(<App />);

    // seleciona o link Favorite Pokemons
    const pokemonsFavoritos = getByText(/Favorite Pokémons/i);

    fireEvent.click(pokemonsFavoritos);
    const pathAtual = '/favorites';

    expect(history.location.pathname).toBe(pathAtual);
  });

  it('testa rota Home', () => {
    // renderiza o app
    const { history, getByText } = renderWithRouter(<App />);

    // seleciona o link Favorite Pokemons
    const pokemonsFavoritos = getByText(/Home/i);

    fireEvent.click(pokemonsFavoritos);
    const pathAtual = '/';

    expect(history.location.pathname).toBe(pathAtual);
  });

  it('testa rota About', () => {
    // renderiza o app
    const { history, getByText } = renderWithRouter(<App />);

    // seleciona o link Favorite Pokemons
    const pokemonsFavoritos = getByText(/About/i);

    fireEvent.click(pokemonsFavoritos);
    const pathAtual = '/about';

    expect(history.location.pathname).toBe(pathAtual);
  });
});
