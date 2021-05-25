import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('contains a set of fixed navigation links', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('link', {
    name: /home/i,
  });
  const about = getByRole('link', {
    name: /about/i,
  });
  const favoritePokemons = getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});
