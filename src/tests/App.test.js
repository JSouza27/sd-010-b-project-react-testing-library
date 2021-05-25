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

test('Testando a Rota', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const link = getAllByRole('link');

  expect(link[0]).toHaveTextContent('Home');

  expect(link[1]).toHaveTextContent('About');

  expect(link[2]).toHaveTextContent('Favorite Pokémons');
});
