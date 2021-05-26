import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachu = pokemons[0];

describe('Checks PokemonDetails', () => {
  it('Test whether detailed Pokémon information is shown on the screen', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();

    fireEvent.click(linkMoreDetails);

    const namePokemon = screen.getByText(`${pikachu.name} Details`);
    expect(namePokemon).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();

    const subtitle = screen.getByRole('heading', {
      name: /summary/i,
    });

    expect(subtitle).toBeInTheDocument();

    const summary = screen.getByText('This intelligent Pokémon'
    + ' roasts hard berries with electricity to make them tender enough to eat.');
    expect(summary).toBeInTheDocument();
    expect(summary.textContent).toBe(pikachu.summary);
  });

  it('Test if there is a session containing the maps and locations', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();

    fireEvent.click(linkMoreDetails);

    const subtitle = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });

    expect(subtitle).toBeInTheDocument();

    const locations = screen.getAllByAltText(/Pikachu location/i);
    const locationsInData = pikachu.foundAt;
    expect(locations.length).toEqual(locationsInData.length);

    const nameOfSecondLocation = screen.getByText('Kanto Viridian Forest');
    expect(nameOfSecondLocation.textContent).toBe(locationsInData[0].location);

    const nameOfFirstLocation = screen.getByText('Kanto Power Plant');
    expect(nameOfFirstLocation.textContent).toBe(locationsInData[1].location);

    locationsInData.forEach((location, index) => {
      const image = screen.getAllByAltText('Pikachu location');
      expect(image[index].src).toBe(location.map);
      expect(image[index].alt).toBe('Pikachu location');
    });
  });

  it('Test whether you can add a Pokémon to favorites via the details page.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();

    fireEvent.click(linkMoreDetails);

    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    fireEvent.click(checkbox);

    const favoriteImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImage).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favoriteImage).not.toBeInTheDocument();
  });
});
