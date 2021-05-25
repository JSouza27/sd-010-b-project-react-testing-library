import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testing component <App>', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('show fixed links in top navigation', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    const about = getByRole('link', { name: /about/i });
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    expect(home).toHaveTextContent('Home');
  });
});
