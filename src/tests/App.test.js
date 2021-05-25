import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { getAllByRole, render } from '@testing-library/react';
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

describe('Requisito 01 - Testar o componente App.js', () => {
  test('Se o primeiro link deve possuir o texto Home.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByRole('link', {
      name: 'Home',
    });

    expect(linkHome).toBeInTheDocument()
  });

  test('Se o segundo link deve possuir o texto About.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkAbout = getByRole('link', {
      name: 'About',
    });

    expect(linkAbout).toBeInTheDocument()
  });

  test('Se o terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkFavorites = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(linkFavorites).toBeInTheDocument()
  });
})
