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
    name: /About Pokédex/i,
  });

  expect(aboutText).toBeInTheDocument();
});

test('clicking on the Favorite Pokemons link goes to the /favorites route', () => {
  const { getByRole } = renderWithRouter(<App />);
  const favoritePokemons = getByRole('link', {
    name: /Favorite Pokémons/i,
  });

  userEvent.click(favoritePokemons);

  const favoritePokemonsText = getByRole('heading', {
    level: 2,
    name: /Favorite pokémons/i,
  });

  expect(favoritePokemonsText).toBeInTheDocument();
});

test('when entering an unknown route goes to NotFound', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const routeNonexistent = '/not-found-page';
  history.push(routeNonexistent);

  const notFoundText = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});
