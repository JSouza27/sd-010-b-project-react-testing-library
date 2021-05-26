import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(favoriteLink).toBeInTheDocument();
});
