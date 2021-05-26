import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Pokedex from '../components/Pokedex';

test('check is there is a heading h2', () => {
  renderWithRouter(<Pokedex />);

  const message = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(message).toBeInTheDocument();
});

test('check is there is a next Pokemon button', () => {
  renderWithRouter(<Pokedex />);

  const nextPokemon = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  userEvent.click(nextPokemon);
});

// test('check is there is a filter Pokemon button', () => {
//   renderWithRouter(<Pokedex />);

//   const nextPokemon = screen.getByRole('button', {
//     name: 'Próximo pokémon',
//   });
//   userEvent.click(nextPokemon);
// });

// test('check is there is a reset filter Pokemon button', () => {
//   renderWithRouter(<Pokedex />);

//   const nextPokemon = screen.getByRole('button', {
//     name: 'Próximo pokémon',
//   });
//   userEvent.click(nextPokemon);
// });
