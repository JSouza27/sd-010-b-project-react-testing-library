import React from 'react';
import { fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
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

  it('should have detailed information on the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
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
  });
});
