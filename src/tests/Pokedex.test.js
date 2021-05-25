import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Requirement 5', () => {
  const idName = 'pokemon-name';
  const idType = 'pokemon-type';

  it('verify h2 content, buttons and list pokemons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const H2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(H2).toBeInTheDocument();

    const firstPokemon = getByTestId(idName).textContent;
    expect(firstPokemon).toBe('Pikachu');

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    const nextpokemon = getByTestId(idName).textContent;
    expect(nextpokemon).not.toBe(firstPokemon);
  });

  it('verify if have one pokemon one at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const { length } = getAllByTestId(idName);

    expect(length).toBe(1);
  });

  it('verify type buttons', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);

    const TOTALBUTTONS = 7;
    const AllButtons = getAllByTestId('pokemon-type-button');
    expect(AllButtons.length).toBe(TOTALBUTTONS);

    const psychicButton = getByText('Psychic');
    expect(psychicButton).toBeInTheDocument();
    fireEvent.click(psychicButton);

    const firstPokemonType = getByTestId(idType).textContent;
    expect(firstPokemonType).toBe('Psychic');

    const nextButton = getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    const SecondPokemonType = getByTestId(idType).textContent;
    expect(SecondPokemonType).toBe('Psychic');
  });

  it('find button "All, click it"', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const AllButton = getByText(/all/i);
    expect(AllButton).toBeInTheDocument();

    fireEvent.click(AllButton);
    const firstPokemon = getByTestId(idName).textContent;
    expect(firstPokemon).toBe('Pikachu');
  });
});
