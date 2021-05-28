import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { Button } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 5 - Test the <Pokedex.js> component', () => {
  it('Tests if the page contains an h2 header with the text \'Pokémon found\'', () => {
    // Acessar componentes
    const { getByRole } = renderWithRouter(<App />);

    // Manipular componentes

    // Testar componentes
    const headingH2 = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });

  it('Tests if the next Pokémon is displayed when the Next button is clicked.', () => {
    // Acessar componentes
    const { getByText } = renderWithRouter(<App />);

    // Manipular e testar componentes
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    const btnNext = getByText('Próximo pokémon');
    userEvent.click(btnNext);
    const secondPokemon = getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('Tests if only one Pokémon is shown at a time.', () => {

  });

  it('Tests if a Pokédex has the filter buttons.', () => {
    // Acessar componentes
    const { getAllByTestId } = renderWithRouter(<App />);

    // Manipular e testar componentes
    const filtersButtons = getAllByTestId('pokemon-type-button');
    const filtersButtonsQTD = 7;
    expect(filtersButtons.length).toBe(filtersButtonsQTD);
  });

  it('Tests if the Pokédex contains a button to reset the filter', () => {

  });

  it('Tests if a filter button is dynamically created for each type of Pokémon', () => {
    // Acessar componentes
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);

    // Manipular e testar componentes
    const filtersButtons = getAllByTestId('pokemon-type-button');
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Electric',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Fire',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Bug',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Poison',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Psychic',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Normal',
    }));
    expect(filtersButtons).toContain(getByRole('button', {
      type: Button,
      name: 'Dragon',
    }));
  });

  it('', () => {

  });
});
