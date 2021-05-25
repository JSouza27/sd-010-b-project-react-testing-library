import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('requirement 1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/pokédex/i);

    expect(heading).toBeInTheDocument();
  });

  it('verify links if exists (Home, About, Favorite Pokémons)', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkHome = getByRole('link', { name: 'Home' });
    const linkAbout = getByRole('link', { name: 'About' });
    const linkFavoritePokemons = getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Teste click of links and redirect route', () => {
    const { history, getByText } = renderWithRouter(<App />);

    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    history.push('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
    history.push('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    history.push('/notFoundPages');
    expect(getByText(/Page requested not found/)).toBeInTheDocument();
  });
});
