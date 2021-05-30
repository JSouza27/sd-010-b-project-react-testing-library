import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../helper/renderWithRoute';

describe('Request 1', () => {
  it('shows the Pokédex when the route is `/`', () => {
    renderWithRoute(<App />);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('render a link called home', () => {
    renderWithRoute(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('render a link called about', () => {
    renderWithRoute(<App />);
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('render a link called favorites', () => {
    renderWithRoute(<App />);
    const fav = screen.getByText(/Favorite Pokémons/i);
    expect(fav).toBeInTheDocument();
  });

  it('renders a reading with the text `Pokédex`', () => {
    renderWithRoute(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});
