import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderRouter from '../services/RenderRouter';

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  RenderRouter(<App />);
  expect(screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  })).toBeInTheDocument();
});

test('se o botão traz outro pokemon', () => {
  RenderRouter(<App />);
  const nextPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(screen.getByText('Pikachu')).toHaveTextContent(/Pikachu/i);
  userEvent.click(nextPoke);
  expect(screen.getByText('Charmander')).toHaveTextContent(/Charmander/i);
  const pokeIndex = 7;
  for (let index = 0; index < pokeIndex; index += 1) {
    userEvent.click(nextPoke);
  }
  expect(screen.getByText('Dragonair')).toHaveTextContent(/Dragonair/i);
  userEvent.click(nextPoke);
  expect(screen.getByText('Pikachu')).toHaveTextContent(/Pikachu/i);
});

test('se existe filtros e exibe o correspondente', () => {
  RenderRouter(<App />);
  const buttonType = screen.getAllByRole('button');
  expect(buttonType[5]).toHaveTextContent('Psychic');
  userEvent.click(buttonType[5]);
  expect(screen.getByText('Alakazam')).toHaveTextContent('Alakazam');
  expect(buttonType[5]).toHaveAttribute('data-testid', 'pokemon-type-button');
});

test('existe botão de reset', () => {
  RenderRouter(<App />);
  const buttonRest = screen.getAllByRole('button');
  expect(buttonRest[0]).toHaveTextContent('All');
  userEvent.click(buttonRest[5]);
  expect(screen.getByText('Alakazam')).toHaveTextContent('Alakazam');
  userEvent.click(buttonRest[0]);
  expect(screen.getByText('Pikachu')).toHaveTextContent('Pikachu');
});
