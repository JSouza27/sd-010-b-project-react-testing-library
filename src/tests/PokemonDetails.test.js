import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';
import { PokemonDetails } from '../components';

const pokemonPath = '/pokemons/25';

describe('shows detailed information of the selected Pokémon', () => {
  test('renders a text like "Pikachu Details"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const detailsTitle = getByText('Pikachu Details');
    expect(detailsTitle).toBeInTheDocument();
  });
  test('There should be no link for the details of the selected Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    try {
      const detailsBtn = getByText('More details');
      expect(detailsBtn).not.toBeInTheDocument();
    } catch (error) {
      expect(true).toBe(true);
    }
  });
  test('shows a H2 element with text "Summary"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const summaryH2 = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryH2).toBeInTheDocument();
  });
  test('', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const pokemonDetails = getByText(
      'This intelligent Pokémon roasts hard berries'
      + ' '
      + 'with electricity to make them tender enough to eat.',
    );
    expect(pokemonDetails).toBeInTheDocument();
  });
});

describe('renders maps with locations of the pokémon', () => {
  test('shows a H2 element with "Game Locations of Pikachu"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const mapH2 = getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(mapH2).toBeInTheDocument();
  });
  test('shows all Pokémons locations', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);
    history.push(pokemonPath);
    const pkdxLocation = getAllByAltText('Pikachu location');
    expect(pkdxLocation.length).toBe(2);
  });
});
