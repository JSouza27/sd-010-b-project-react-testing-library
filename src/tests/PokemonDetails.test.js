import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
// import Data[0].id from '../types';
import Data from '../data';

describe('Check if the pokemon info are displayed', () => {
  test('The page must have a text called Details', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      isFavorite
      match={ { params: { id: Data[0].id } } }
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeName = screen.getByText(/details/i);
    expect(pokeName.innerHTML).toBe('Pikachu Details');
  });

  test('The page must not have a link do Pokemon details', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeDetails = screen.queryByRole('link', {
      name: /details/i,
    });
    expect(pokeDetails).toBe(null);
  });

  test('The page must have a h2 with the text Summary', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(pokeHeading.innerHTML).toBe('Summary');
    const pokeHeading2 = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(pokeHeading2.innerHTML).toContain('This intelligent Pokémon roasts hard');
  });

  test('The page must have a paragraph with a ', () => {
    const { container } = renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      isFavorite
      match={ { params: { id: Data[0].id } } }
      isPokemonFavoriteById={ Data[0].id }
    />);
    const paragraph = container.querySelectorAll('p');
    const number = 10;
    expect(paragraph.length).toBeLessThanOrEqual(number);
  });
});

describe('Check if there is a section with the location of the Pokemons', () => {
  test('In the section details there must be a map', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeHeading2 = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of/i,
    });
    expect(pokeHeading2.innerHTML).toBe('Game Locations of Pikachu');
  });

  test('All pokemon locations must be displayed', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeLocation = screen.getAllByRole('img', {
      name: /location/i,
    });
    const number = 5;
    expect(pokeLocation.length).toBeLessThanOrEqual(number);
  });

  test('The name and location of the pokemon must be displayed', () => {
    const { container } = renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeLocation = screen.getAllByRole('img', {
      name: /location/i,
    });
    const pokeLocation1 = pokeLocation[1];
    const pokeLocationName = container.querySelectorAll('em');
    const pokeLocationName1 = pokeLocationName[1];
    expect(pokeLocationName1.innerHTML).toContain('Kanto Power Plant');
    expect(pokeLocation1).toBeInTheDocument();
  });

  test('The image must have an attribute src with its URl', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeLocation = screen.getAllByAltText(/location/i);
    const pokeLocation1 = pokeLocation[1];
    expect(pokeLocation1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokeLocation1).toContainHTML('Pikachu location');
  });
});
// https://github.com/testing-library/jest-dom#tocontainhtml

describe('Check if the favorite checkbox is working', () => {
  test('Check if there is a favorite checkbox', () => {
    renderWithRouter(<PokemonDetails
      pokemon={ Data[0] }
      pokemons={ Data }
      match={ { params: { id: Data[0].id } } }
      isFavorite
      isPokemonFavoriteById={ Data[0].id }
    />);

    const pokeCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(pokeCheckbox).toBeInTheDocument();
    // userEvent.click(pokeCheckbox);
  });
});
