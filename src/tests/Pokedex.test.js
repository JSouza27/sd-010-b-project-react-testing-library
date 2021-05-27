import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing the Pokedex.js', () => {
  test('if the page has a heading h2 with text \'Encountered pokémons\'', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(h2).toBeDefined();
  });

  test('if when proximo pokemon is clicked, it works', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextBtn = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);
    const element = getByText(/charmander/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(nextBtn);
    const element2 = getByText(/caterpie/i);
    expect(element2).toBeInTheDocument();
  });

  test('if shows just one pokemon', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokemonCard = getAllByRole('img');
    expect(pokemonCard.length).toBe(1);
  });

  test('if pokedex has filter buttons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btn1 = getByRole('button', {
      name: /electric/i,
    });
    expect(btn1).toBeInTheDocument();
    fireEvent.click(btn1);
    const type = getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');
  });

  test('if pokedex has a All button', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btn2 = getByRole('button', {
      name: /all/i,
    });
    expect(btn2).toBeInTheDocument();
    fireEvent.click(btn2);
    const initialPoke = getByTestId('pokemon-name');
    expect(initialPoke.textContent).toBe('Pikachu');
  });

  test('if is created buttons in dynamic method', () => {
    const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const btnTypes = getAllByTestId('pokemon-type-button');
    const number7 = 7;
    expect(btnTypes.length).toBe(number7);
    const type = getByTestId('pokemon-type');
    const btnFire = getByRole('button', {
      name: 'Fire',
    });
    expect(btnFire).toBeInTheDocument();
    fireEvent.click(btnFire);
    expect(type.textContent).toBe('Fire');
    const btnPsychic = getByRole('button', {
      name: 'Psychic',
    });
    expect(btnPsychic).toBeInTheDocument();
    fireEvent.click(btnPsychic);
    expect(type.textContent).toBe('Psychic');
    const btnElectric = getByRole('button', {
      name: 'Electric',
    });
    expect(btnElectric).toBeInTheDocument();
    fireEvent.click(btnElectric);
    expect(type.textContent).toBe('Electric');
    const btnBug = getByRole('button', {
      name: 'Bug',
    });
    expect(btnBug).toBeInTheDocument();
    fireEvent.click(btnBug);
    expect(type.textContent).toBe('Bug');
    const btnPoison = getByRole('button', {
      name: 'Poison',
    });
    expect(btnPoison).toBeInTheDocument();
    fireEvent.click(btnPoison);
    expect(type.textContent).toBe('Poison');
    const btnDragon = getByRole('button', {
      name: 'Dragon',
    });
    expect(btnDragon).toBeInTheDocument();
    fireEvent.click(btnDragon);
    expect(type.textContent).toBe('Dragon');
    const btnNormal = getByRole('button', {
      name: 'Normal',
    });
    expect(btnNormal).toBeInTheDocument();
    fireEvent.click(btnNormal);
    expect(type.textContent).toBe('Normal');
  });

  test('if \'Próximo pokémon\' is disabled when you have just one pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const electricBtn = getByRole('button', {
      name: 'Electric',
    });
    fireEvent.click(electricBtn);
    const nextPoke = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPoke).toBeDisabled();
  });
});
