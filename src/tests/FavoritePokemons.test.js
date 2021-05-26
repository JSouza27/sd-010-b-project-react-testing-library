import React from 'react';
import { fireEvent } from '@testing-library/dom';
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
    const pokemon = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
    }];

    global.fetch(jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemon),
    }));

    const { getByRole, getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /more details/i }));
    expect(getByText('Pikachu Details'));

    fireEvent.click(getByRole('checkbox'));
    const favCheck = getByRole('checkbox', { checked: true });
    expect(favCheck).toBeInTheDocument();

    fireEvent.click(getByRole('link', { name: /favorite pokémon/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    await expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Test if the fav page is empty', () => {
    const pokemon = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
    }];

    global.fetch(jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemon),
    }));

    const { getByRole, getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /more details/i }));
    expect(getByText('Pikachu Details'));

    const favCheck = getByRole('checkbox');
    expect(favCheck).toBeInTheDocument();
    fireEvent.click(favCheck);
    expect(favCheck.checked).toBe(false);

    fireEvent.click(getByRole('link', { name: /favorite pokémon/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
});
