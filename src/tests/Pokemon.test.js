import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

const infoPikachu = {
  id: 25,
  name: 'Pikachu',
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
};

describe('Test the component Pokemon', () => {
  test('renders a card with the informations the pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = infoPikachu;

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const img = getByRole('img', { name: `${infoPikachu.name} sprite` });

    expect(name.textContent).toBe(infoPikachu.name);
    expect(type.textContent).toBe(infoPikachu.type);
    expect(weight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toHaveAttribute('src', infoPikachu.image);
  });

  test('renders a link with the text "More details" ', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(linkDetails);
    const pageDetails = history.location.pathname;

    expect(pageDetails).toBe('/pokemons/25');
  });

  test('renders a icon of star ', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(linkDetails);
    const pageDetails = history.location.pathname;

    expect(pageDetails).toBe('/pokemons/25');

    const checkFavorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    fireEvent.click(checkFavorite);

    const icon = getByRole('img', { name: `${infoPikachu.name} is marked as favorite` });

    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
