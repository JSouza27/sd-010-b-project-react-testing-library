import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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

  // test feito com ajuda de Raphael Gumiery
  test('if show cards favorites pokemons', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/favorite pokémons/i));
    const data = getAllByTestId('pokemon-name');
    expect(data.length).toBe(1);
  });
});
