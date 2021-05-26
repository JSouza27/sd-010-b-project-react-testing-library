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
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('renders a link Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
});

test('renders a link About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
});

test('renders a link Favorite Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
});
