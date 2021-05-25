import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);

  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
