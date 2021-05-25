import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  expect(home).toHaveAttribute('href', '/');

  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  expect(about).toHaveAttribute('href', '/about');

  const favoritePokemons = getByText(/Favorite Pokémons/i);
  expect(favoritePokemons).toBeInTheDocument();
  expect(favoritePokemons).toHaveAttribute('href', '/favorites');
});
