import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testing the PokemonDetails Component', () => {
  it('Shows name, summary, and paragraph', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const pokemonName = getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(pokemonName).toBeInTheDocument();
    const summary = getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const text = getByText(`${pokemons[0].summary}`);
    expect(text).toBeInTheDocument();
  });
  it('Shows location, and images of location', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const pokemonLocation = getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2 });
    expect(pokemonLocation).toBeInTheDocument();
    const imageLocation = getAllByRole('img', { name: /pikachu location/i });
    expect(imageLocation).toHaveLength(2);
    expect(imageLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocation[0]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('Shows the text "Pokémon favoritado?"', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    expect(getByText(/pokémon favoritado\?/i)).toBeInTheDocument();
  });
});
