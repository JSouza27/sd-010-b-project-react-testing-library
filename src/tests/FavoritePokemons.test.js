import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste Favorite Pokemons', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
  });
});
