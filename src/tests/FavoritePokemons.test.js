import React from 'react';
import { findByText, fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import Favorite from '../components/FavoritePokemons';
import App from '../App';

describe('Test `Favorite pokémon` component', () => {
  it('Test not found pokemon', () => {
    const { getByText, history } = renderWithRouter(<Favorite />);
    history.push('favorites');
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  afterEach(() => jest.clearAllMocks());
  it('Test pokemon card in favorites', async () => {
    const pukemion = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
    };

    global.fetch(jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pukemion),
    }));

    const { getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /more details/i }));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByRole('link', { name: /favorite pokémon/i }));
    await findByText('Pikachu');
    // const { location: { pathname } } = history;
    // expect(pathname).toBe('/favorites');
  });
});
