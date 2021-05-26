import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Test Pokemon Details Component', () => {
  // const favoritePokes = {};
  // pokemons.forEach(({ id }, index) => {
  //   if (index % 2 === 0) {
  //     favoritePokes[id] = true;
  //   } else {
  //     favoritePokes[id] = false;
  //   }
  // });
  // const detailedPokeWithProps = (
  //   <PokemonDetails
  //     pokemons={ pokemons }
  //     isPokemonFavoriteById={ favoritePokes }
  //     match={ { params: { id: '4' } } }
  //   />
  // );

  const Poke = 0;

  it('should have detailed information on the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const { name, summary, foundAt } = pokemons[Poke];
    const nextPoke = getByText('Próximo pokémon');
    expect(nextPoke).toBeInTheDocument();
    for (let index = 0; index < Poke; index += 1) {
      fireEvent.click(nextPoke);
    }
    const Link = getByText('More details');
    expect(Link).toBeInTheDocument();
    fireEvent.click(Link);
    expect(Link).not.toBeInTheDocument();

    const nameHeading = getByText(`${name} Details`);
    expect(nameHeading).toBeInTheDocument();

    const summaryHeader = getByText('Summary');
    expect(summaryHeader).toBeInTheDocument();

    const summaryText = getByText(summary);
    expect(summaryText).toBeInTheDocument();

    const locationsHeader = getByText(`Game Locations of ${name}`);
    expect(locationsHeader).toBeInTheDocument();
    foundAt.forEach(({ location, map }) => {
      const pokeLocation = getByText(location);
      const img = getByText(location).parentElement.parentElement.firstChild;
      expect(pokeLocation).toBeInTheDocument();
      expect(img.src).toBe(map);
      expect(img.alt).toBe(`${name} location`);
    });
  });
  it('should be able to toggle favorite pokemon', () => {
    const { getByLabelText, getByText, getAllByRole } = renderWithRouter(<App />);

    const nextPoke = getByText('Próximo pokémon');
    expect(nextPoke).toBeInTheDocument();
    for (let index = 0; index < Poke; index += 1) {
      fireEvent.click(nextPoke);
    }
    const Link = getByText('More details');
    expect(Link).toBeInTheDocument();
    fireEvent.click(Link);

    const input = getByLabelText('Pokémon favoritado?');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('checkbox');

    fireEvent.click(input);
    expect(input).toBeChecked();
    const favoriteIcon = getAllByRole('img')[1];
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(input);
    expect(input).not.toBeChecked();
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
