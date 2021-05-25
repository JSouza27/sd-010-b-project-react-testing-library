import React from 'react';
import userEvent from '@testing-library/user-event';
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

it('tests if the App has 3 links: Home, About and Favorite Pokemons', () => {
  const { getByRole } = renderWithRouter(<App />);

  const homeLink = getByRole('link', { name: /Home/i });
  const aboutLink = getByRole('link', { name: /About/i });
  const FavoritePokemons = getByRole('link', { name: /Favorite Pok/i });

  expect(homeLink).toHaveTextContent('Home');
  expect(aboutLink).toHaveTextContent('About');
  expect(FavoritePokemons).toHaveTextContent('Favorite Pok');
});

it('tests the if the Home path its correct', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const homeLink = getByRole('link', { name: /Home/i });
  userEvent.click(homeLink);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/');
});

it('tests the if the About path its correct', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const aboutLink = getByRole('link', { name: /About/i });
  userEvent.click(aboutLink);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/about');
});

it('tests the if the Favorite Pokemons path its correct', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const FavoritePokemons = getByRole('link', { name: /Favorite Pok/i });
  userEvent.click(FavoritePokemons);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/favorites');
});

// Teste do Not Found baseada na ultima aula da Maite

it('tests the Not Found route', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const route = '/pagina-que-nao-existe';
  history.push(route);

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
