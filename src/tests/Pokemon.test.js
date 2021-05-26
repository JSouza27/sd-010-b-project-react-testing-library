import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing the Pokemon.js', () => {
  const pokemonData = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };

  test('testing if the a card of pokemon is renderized', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <App
        pokemon={ pokemonData }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeigth = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText(/sprite/i);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  test('testing if a link \'More details\' is renderized with card', () => {
    const { getByRole } = renderWithRouter(<App pokemon={ pokemonData } />);
    const detailsLink = getByRole('link', {
      name: 'More details',
    });
    expect(detailsLink.pathname).toBe('/pokemons/25');
    fireEvent.click(detailsLink);
    const pokemonTitle = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(pokemonTitle).toBeInTheDocument();
  });

  test('testing if a the pathname is changed for /pokemons/<id>', () => {
    const { history, getByRole } = renderWithRouter(<App pokemon={ pokemonData } />);
    const detailsLink = getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if the pokemon card has a star after click the isFavorite', () => {
    const { getByLabelText, getByAltText, getByRole } = renderWithRouter(
      <App
        pokemon={ pokemonData }
      />,
    );
    const detailsLink = getByRole('link', {
      name: 'More details',
    });
    fireEvent.click(detailsLink);
    const isFavorite = getByLabelText('Pokémon favoritado?');
    expect(isFavorite).toBeInTheDocument();
    fireEvent.click(isFavorite);
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
