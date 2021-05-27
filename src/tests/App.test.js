import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Check if there is a link to Home', () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Check if there is a link to About', () => {
  const { history } = renderWithRouter(<App />);
  const about = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Check if there is a link to Favorite Pokemon', () => {
  const { history } = renderWithRouter(<App />);
  const favorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(favorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
