import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste do primeiro requisito', () => {
  test('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Pokédex');

    expect(home).toBeInTheDocument();
  });

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
