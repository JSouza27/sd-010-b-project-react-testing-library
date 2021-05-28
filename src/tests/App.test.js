import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renders the three navigation links', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText('About');
  const favorites = getByText('Favorite Pokémons');
  const locations = getByText('Locations');
  const generations = getByText('Generations');
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorites).toBeInTheDocument();
  expect(locations).toBeInTheDocument();
  expect(generations).toBeInTheDocument();
});

test('Test if About link directs to home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText('Home');
  userEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Test if About link directs to home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText('About');
  userEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Test if Favorite Pokémons link directs to Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favorite = getByText('Favorite Pokémons');
  userEvent.click(favorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('test if unrecognized path redirects to NotFound', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/xablau');
  render(
    <MemoryRouter history={ history }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/page requested not found/i)).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Test if Locations link directs to Locations', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const location = getByText('Locations');
  userEvent.click(location);
  const { pathname } = history.location;
  expect(pathname).toBe('/locations');
});

test('Test if Generations link directs to Generations', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const generations = getByText('Generations');
  userEvent.click(generations);
  const { pathname } = history.location;
  expect(pathname).toBe('/generations');
});
