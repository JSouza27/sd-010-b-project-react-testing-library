import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('renders a reading with the text `About Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('renders a reading with the Pokédex image', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
    .toHaveAttribute('src', expect.stringContaining('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
});
