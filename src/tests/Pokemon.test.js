import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Card dos Pokemons', () => {
  test('card', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const namePokemon = getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
    const tipoPokemon = getByTestId('pokemon-type');
    expect(tipoPokemon).toHaveTextContent('Electric');
    const informacaoPokemon = getByText('Average weight: 6.0 kg');
    expect(informacaoPokemon).toBeInTheDocument();
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Links do card', () => {
    const { getByText, history, getAllByRole, getByTestId } = renderWithRouter(<App />);
    const linkCard = getByText('More details');
    expect(linkCard).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    fireEvent.click(getByText('Pokémon favoritado?'));
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', '/star-icon.svg');
    const pokemon = getByTestId('pokemon-name').innerHTML;
    expect(image[1]).toHaveAttribute('alt', `${pokemon} is marked as favorite`);
  });
});
