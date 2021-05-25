import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

/* test('renders a reading with the text `Pokédex`', () => {
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
}); */

describe('Requisito 1', () => {
  test('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const HomeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(HomeLink).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const AboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(AboutLink).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto favorite Pokemons.', () => {
    renderWithRouter(<App />);
    const FavoriteLink = screen.getByRole('link', {
      name: /favorite Pokémons/i,
    });
    expect(FavoriteLink).toBeInTheDocument();
  });
});
