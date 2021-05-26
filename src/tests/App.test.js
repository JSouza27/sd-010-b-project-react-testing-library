import userEvent from '@testing-library/user-event';
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

test('clicking on the Home link redirects you to the / route', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('link', {
    name: /home/i,
  });

  userEvent.click(home);

  const homeText = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });

  expect(homeText).toBeInTheDocument();
});

test('clicking on the About link redirects you to the /about route', () => {
  const { getByRole } = renderWithRouter(<App />);
  const about = getByRole('link', {
    name: /about/i,
  });

  userEvent.click(about);

  const aboutText = getByRole('heading', {
    level: 2,
    name: /About Pokédexs/i,
  });

  expect(aboutText).toBeInTheDocument();
});
