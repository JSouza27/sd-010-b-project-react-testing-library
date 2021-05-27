import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './RenderWithRouter';
import Data from '../data';

describe('check if the application page renders a pokemon card', () => {
  test('The correct name must be displayed', () => {
    renderWithRouter(<Pokemon
      pokemon={ Data[0] }
      isFavorite
    />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Pikachu');
  });

  test('The correct type must be displayed', () => {
    renderWithRouter(<Pokemon
      pokemon={ Data[0] }
      isFavorite
    />);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe('Electric');
  });

  test('The correct average weight must be displayed', () => {
    renderWithRouter(<Pokemon
      pokemon={ Data[0] }
      isFavorite
    />);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('An image must be displayed', () => {
    renderWithRouter(<Pokemon
      pokemon={ Data[0] }
      isFavorite
    />);
    const pokeImage = screen.getByAltText(/sprite/i);
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

test('Check if there is a link to the display detais', () => {
  const { history } = renderWithRouter(<Pokemon
    pokemon={ Data[1] }
    isFavorite
  />);
  const link = screen.getByRole('link', {
    name: /More Details/i,
  });
  userEvent.click(link);
  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/4');
});

// test('Check if by clicking the user is redirect', () => {
//   const { history } = renderWithRouter(<Pokemon
//     pokemon={ Data[0] }
//     isFavorite
//   />);
//   const link = screen.getByRole('link', {
//     name: /More Details/i,
//   });
//   userEvent.click(link);
//   const { pathname } = history.location;

//   expect(pathname).toBe(`/pokemons/${data1}`);
// });

test('The icon must have an image', () => {
  renderWithRouter(<Pokemon
    pokemon={ Data[0] }
    isFavorite
  />);

  const pokeImage = screen.getByAltText(/is marked as favorite/i);
  expect(pokeImage).toHaveAttribute('src', '/star-icon.svg');
  expect(pokeImage).toContainHTML('Pikachu is marked as favorite');
});
