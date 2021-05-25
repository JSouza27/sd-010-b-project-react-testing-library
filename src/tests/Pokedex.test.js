import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('test Pokedex component', () => {
  const proxPokemonTexto = 'Próximo pokémon';
  test('heading h2 existence', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  test('if shows next pokemon when clicked', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(proxPokemonTexto);
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(proxPokemonTexto);
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon2 = getByText('Charmander');
    expect(pokemon2).toBeInTheDocument();
  });

  test('if only one pokemon is shown at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemons = getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
  // código de https://github.com/tryber/sd-09-project-react-testing-library/pull/98/commits/31b97ee8666fc58245df97494dc2136ff37f55fe

  test('if filter is working', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(proxPokemonTexto);
    const fireButton = getByText('Fire');
    fireEvent.click(fireButton);
    const pokemon1 = getByText('Charmander');
    expect(pokemon1).toBeInTheDocument();
    fireEvent.click(nextButton);
    const pokemon2 = getByText('Rapidash');
    expect(pokemon2).toBeInTheDocument();
  });

  test('if All button filter is working', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText('All');
    fireEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });

  test('filter buttons', () => {
    const pokemonsTypes = [
      'Fire',
      'Psychic',
      'Electric',
      'Bug',
      'Poison',
      'Dragon',
      'Normal'];
    const { getByRole } = renderWithRouter(<App />);
    pokemonsTypes.forEach((type) => {
      const button = getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(type);
    });

  });
});
