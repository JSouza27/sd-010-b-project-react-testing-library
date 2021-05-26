import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o componente <FavoritePokemons />', () => {
  test('Exibe mensagem No Pokemons Found', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemonsFound = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemonsFound).toBeInTheDocument();
  });

  test('Exibe todos os cards de pokemons que estão favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });

    fireEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    history.push('/favorites');
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toEqual(1);
  });
});
