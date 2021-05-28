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

describe('testing the link component in pokemon cards', () => {
  it('shows a link to more details of a pokemon in each card', () => {
    const { getByRole } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const detailsLink = getByRole('link', { name: /more details/i });
      expect(detailsLink).toBeInTheDocument();
      expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      nextButton();
      fireEvent.click(nextButton()[0]);
    });
  });
  it('shows a star icon if the pokemon is marked as favorite', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const headingName = getByRole('heading', { name: /pikachu details/i });
    expect(headingName).toBeInTheDocument();
    const favBox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favBox).toBeInTheDocument();
    expect(favBox).not.toBeChecked();
    fireEvent.click(favBox);
    expect(favBox).toBeChecked();
    const starIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
