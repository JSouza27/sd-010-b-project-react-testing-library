import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing App', () => {
  test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
