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

describe('Teste se o topo da aplicação contém um conjunto de links', () => {
  test('Primeiro link deve ter o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
  });

  test('Primeiro link deve ter o texto About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText('About');
    expect(about).toBeInTheDocument();
  });

  test('Primeiro link deve ter o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText('Favorite Pokémons');
    expect(about).toBeInTheDocument();
  });
});
