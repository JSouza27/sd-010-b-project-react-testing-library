import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
  },
];

global.fetch(jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(pokemons),
}));

describe('Testing the `Pokédex` component', () => {
  it('Test if pokedex page/home have a heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });

  it('test if the btn have text `Próximo pokémon`', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const firstPoke = getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();

    const nextBtn = getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);
    const nextPoke = getByText('Charmander');
    expect(nextPoke).toBeInTheDocument();

    fireEvent.click(nextBtn);
    const lastPoke = getByText('Caterpie');
    expect(lastPoke).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(firstPoke).toBeInTheDocument();
  });

  it('Test if the filter button limit the pokedex', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const type = 'Electric';
    const btnFilter = getByRole('button', { name: type });
    expect(btnFilter).toBeInTheDocument();

    fireEvent.click(btnFilter);
    expect(getByTestId('pokemon-type').innerHTML).toBe(type);
    const nextPoke = getByRole('button', { name: /próximo pokémon/i });
    expect(nextPoke.disabled).toBe(true);

    const btnAll = getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
    expect(nextPoke.disabled).toBe(false);
  });

  // it('should Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
  // });
});
