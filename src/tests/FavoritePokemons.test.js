import { render } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testing component About.js', () => {
  test('if contain text About Pokédex', () => {
    const { getByRole } = render(<FavoritePokemons />);
    const about = getByRole('heading', { level: 2, name: /favorite pokémons/i });
    expect(about).toBeInTheDocument();
  });
  test('if not contain favorite pokemon', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFoundtext = getByText('No favorite pokemon found');
    expect(notFoundtext).toBeInTheDocument();
  });
});
