import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Testing the `Pokédex` component', () => {
  it('Test if pokedex page/home have a heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });

  it('test if the btn have text `Próximo pokémon`', () => {
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

  // it('Teste se a Pokédex tem os botões de filtro', () => {
  //   console.log('oi');
  // });
});
