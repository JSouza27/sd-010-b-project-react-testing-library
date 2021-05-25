import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test "App" component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders header with links for "Home", "About" and "Favorite Pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    const about = getByRole('link', { name: /about/i });
    const favoritePokemon = getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
});
