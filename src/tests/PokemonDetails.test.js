import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test PokemonDetails component', () => {
  test('if pokemon details are displayed on screen', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(moreDetails).not.toBeInTheDocument();
    const pokemonName = getByText('Pikachu Details');
    const sumario = getByText('Summary');
    expect(sumario).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });
});
