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

test('check if there are a set of links to Home, About and Favorite Pokemon', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(home);

  const about = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(about);

  const favorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(favorite);
});
