// test('', () => {});
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testing the Pokemon Component', () => {
  // console.log(history);
  it('tests if a card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    let name;
    let type;
    let weight;
    let value;
    let unit;
    let img;

    pokemons.forEach((poke) => {
      name = getByTestId('pokemon-name');
      type = getByTestId('pokemon-type');
      weight = getByTestId('pokemon-weight');
      img = getByAltText(`${poke.name} sprite`, { src: poke.image });
      expect(name).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      value = poke.averageWeight.value;
      unit = poke.averageWeight.measurementUnit;
      expect(weight).toHaveTextContent(`Average weight: ${value} ${unit}`);
      expect(img).toBeInTheDocument();
      userEvent.click(btnNext);
    });
  });

  it('tests if the Pokémon card contains a navigation link to view details', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('tests if clicking on navigation link redirects to details page', () => {});
  it('tests if a URL displayed in the browser changes to / pokemon / <id>', () => {});
  it('tests whether there is a star icon on favorite Pokémon', () => {});
});
