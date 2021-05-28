import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('renders a reading with the text `About Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renders a reading with two paragraphs', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const paragraph1 = getByText(/This application simulates/i);
  const paragraph2 = getByText(/One can filter/i);
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('renders a reading with the Pokédex image', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  expect(screen.getByAltText('Pokédex'))
    .toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
});
