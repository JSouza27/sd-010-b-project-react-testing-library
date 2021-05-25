import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('testing the component FavoritePokemon', () => {
  it('not favorite pokemon found, if it has not be marked', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFoundText = getByText(/no favorite pokemon found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('shows every pokemon marked as favorite', () => {
    render(
      <Router>
        <FavoritePokemons pokemons={ data } />
      </Router>,
    );
    const favorite = screen.getByRole('img', {
      name: /snorlax sprite/i,
    });
    expect(favorite).toBeInTheDocument();
  });

  const data1 = [];

  it('if no one pokemon is marked as favorite, shows zero pokemons', () => {
    render(
      <Router>
        <FavoritePokemons pokemons={ data1 } />
      </Router>,
    );
  });
});
