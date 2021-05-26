import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokedexHeading = getByText('Pokédex');
  expect(pokedexHeading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  const pokedex = getByText('Encountered pokémons');
  expect(pokedex).toBeInTheDocument();
});

test('shows a list of links at the top of app', () => {
  const { getByText } = renderWithRouter(<App />);
  const homeLink = getByText('Home');
  const aboutLink = getByText('About');
  const favPokemonLink = getByText('Favorite Pokémons');
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favPokemonLink).toBeInTheDocument();
});

test('renders the home page, at the URL "/" when click "Home" link', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const homeLink = getByRole('link', {
    name: /home/i,
  });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  const homeText = getByText('Encountered pokémons');
  expect(pathname).toBe('/');
  expect(homeText).toBeInTheDocument();
});

test('renders the about page, at the URL "/about" when click "About" link', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const aboutLink = getByRole('link', {
    name: /about/i,
  });
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  const aboutText = getByText('About Pokédex');
  expect(pathname).toBe('/about');
  expect(aboutText).toBeInTheDocument();
});

test('shows favorite pokémons page, with URL "/favorites" in respective link', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const favPokemonLink = getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(favPokemonLink);
  const { pathname } = history.location;
  const favPokemonText = getByText('Favorite pokémons');
  expect(pathname).toBe('/favorites');
  expect(favPokemonText).toBeInTheDocument();
});

test('the app is redirected to the Not Found page when entering an unknown URL', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/unknow-url');
  const notFoundPage = getByText('Page requested not found');
  expect(notFoundPage).toBeInTheDocument();
});
