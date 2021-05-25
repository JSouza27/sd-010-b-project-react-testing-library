import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon detalhes', () => {
  it('Deve mostrar os detalhes do pokemon na tela ', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    fireEvent.click(buttonDetails);
    const pokemonName = getByText('Pikachu Details');
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonInfo = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(buttonDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });
  it('Deve mostrar uma sessão com mapas ', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);
    fireEvent.click(buttonDetails);
    const pokemonGameLocation = getByRole('heading', {
      level: 2,
      name: /Game locations of Pikachu/i,
    });
    const pokeLocations = getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(pokemonGameLocation).toBeInTheDocument();
    expect(pokeLocations.length).toBe(2);
    expect(pokeLocations[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('Deve favoritar um pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More Details/i);

    fireEvent.click(buttonDetails);
    const checkbox = getByRole('checkbox');
    const label = getByText(/Pokémon favoritado?/i);

    fireEvent.click(checkbox);

    expect(checkbox).toBeTruthy();
    expect(label).toBeInTheDocument();
  });
});
