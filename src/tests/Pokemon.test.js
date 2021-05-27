import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const nextButton = () => screen.getAllByTestId('next-pokemon');

describe('Pokemon Component tests', () => {
  it('shows pokemon name,', () => {
    const { getByText } = renderWithRouter(<App />);
    pokemons.forEach(({ name }) => {
      const pokemonName = getByText(`${name}`);
      expect(pokemonName).toBeInTheDocument();
      nextButton();
      fireEvent.click(nextButton()[0]);
    });
  });
  it('shows the type of pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(`${type}`);
      nextButton();
      fireEvent.click(nextButton()[0]);
    });
  });
  it('shows Average weight: <value> and measurementUnit: <value>', () => {
    const { getByText } = renderWithRouter(<App />);
    pokemons.forEach(({ averageWeight: { value, measurementUnit } }) => {
      const pokemonWeight = getByText(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokemonWeight).toBeInTheDocument();
      nextButton();
      fireEvent.click(nextButton()[0]);
    });
  });
  it('shows image of each pokemon in the card, checks the src and alt', () => {
    const { getByRole } = renderWithRouter(<App />);
    pokemons.forEach(({ name, image }) => {
      const pokemonImage = getByRole('img', { name: `${name} sprite` });
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
      expect(pokemonImage).toHaveAttribute('src', `${image}`);
      nextButton();
      fireEvent.click(nextButton()[0]);
    });
  });
});

// describe('testing the link component in pokemon cards', () => {
//   it('shows a link to more details of in each card', () => {
//     const { getByRole } = renderWithRouter(<App />);
//     const detailsLink = getByRole('link', { name: /more details/i });
//     expect(detailsLink).toBeInTheDocument();
//   });
// });
