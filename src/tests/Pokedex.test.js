import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('Teste se página contém um heading com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });

  expect(heading).toBeInTheDocument();
});

test('O botão deve conter o texto "Próximo Pokémon"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(button).toBeInTheDocument();
});

test('Botão deve conter Próximo pokémon', () => {
  const nameId = 'next-pokemon';
  const { getByTestId } = renderWithRouter(<App />);
  const button = getByTestId(nameId);
  userEvent.click(button);
  expect(button).toBeInTheDocument();
});
