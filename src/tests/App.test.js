import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('first  link must be Home', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const linkToHome = screen.getByRole('link', {
    name: /Home/i,
  });

  expect(linkToHome).toBeInTheDocument();
});

test('second  link must be About', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const linkToHome = screen.getByRole('link', {
    name: /About/i,
  });

  expect(linkToHome).toBeInTheDocument();
});

test('third  link must be Favorite Pokémons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const linkToHome = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });

  expect(linkToHome).toBeInTheDocument();
});
