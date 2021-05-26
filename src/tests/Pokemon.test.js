import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('Testa se card é renderizado com informações de um Pokemon', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const pokeName = getByTestId('pokemon-name');
  const pokeType = getByTestId('pokemon-type');
  const pokeWeight = getByTestId('pokemon-weight');
  const pokeImage = getByRole('img');
  expect(pokeName.textContent).toBe('Pikachu');
  expect(pokeType.textContent).toBe('Electric');
  expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');
  expect(pokeImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokeImage.alt).toContain('Pikachu sprite');
});
