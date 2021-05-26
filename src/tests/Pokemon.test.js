import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Testa se card do pokemon possui link de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkDetails = getByText('More details');
  expect(linkDetails.href).toBe('http://localhost/pokemons/25');
});

test('Ao clicar em More Details redireciona para (URL /pokemons/id)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const details = getByText('More details');
  userEvent.click(details);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const screenText = getByText('Pikachu Details');
  expect(screenText).toBeInTheDocument();
});
