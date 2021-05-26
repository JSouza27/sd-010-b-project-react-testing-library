import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderRouter from './renderWithRoute';

import App from '../App';
import pokemons from '../data';

describe('Teste página de detalhes pokémon', () => {
  test('Teste as informações detalhadas do Pokémon', () => {
    renderRouter(<App />);
    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const pokemonHeader = screen.getByText(`${pokemons[0].name} Details`);
    expect(pokemonHeader.textContent).toBe('Pikachu Details');

    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas', () => {
    renderRouter(<App />);
    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const mapHead = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(mapHead).toBeInTheDocument();

    const imageLoc = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(imageLoc[0]).toBeInTheDocument();

    expect(imageLoc[0].src).toBe(pokemons[0].foundAt[0].map);
  });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    renderRouter(<App />);
    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const checkFav = screen.getByLabelText('Pokémon favoritado?', {
      selector: 'input',
    });
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);

    const favImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImg).toBeInTheDocument();

    userEvent.click(checkFav);
  });
});
