import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Test Pokedex Component', () => {
  const favoritePokes = {};
  pokemons.forEach(({ id }, index) => {
    if (index % 2 === 0) {
      favoritePokes[id] = true;
    } else {
      favoritePokes[id] = false;
    }
  });
  const PokedexWithProps = (
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokes }
    />
  );

  it('Should have a heading with "Encountered pokémons" ', () => {
    const { getByText, getByRole } = renderWithRouter(PokedexWithProps);
    const h2Heading = getByRole('heading', { level: 2 });
    expect(h2Heading).toBeTruthy();

    const textContent = getByText('Encountered pokémons');
    expect(textContent).toBeInTheDocument();
  });

  it('should render only one pokemon card at time', () => {
    const { getAllByTestId } = renderWithRouter(PokedexWithProps);
    const card = getAllByTestId('pokemon-card');
    expect(card[0]).toBeInTheDocument();
    expect(card.length).toBe(1);
  });

  it('should render the next pokemon until last pokemon in list, then restart', () => {
    const { getByTestId } = renderWithRouter(PokedexWithProps);
    for (let restart = 1; restart <= 2; restart += 1) {
      for (let index = 0; index < pokemons.length; index += 1) {
        const { name, type, averageWeight: { value, measurementUnit } } = pokemons[index];
        const pokeRenderedName = getByTestId('pokemon-name');
        const pokeRenderedType = getByTestId('pokemon-type');
        const weigth = getByTestId('pokemon-weight');

        expect(pokeRenderedName.textContent).toBe(name);
        expect(pokeRenderedType.textContent).toBe(type);
        expect(weigth.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

        const button = getByTestId('next-pokemon');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
      }
    }
  });

  it('when select a type button, then should show only pokes with that type', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(PokedexWithProps);

    const button = getAllByTestId('pokemon-type-button');
    const TypeButton = button[0];
    expect(TypeButton).toBeInTheDocument();

    const nextPokeButton = getByTestId('next-pokemon');
    expect(nextPokeButton).toBeInTheDocument();

    const buttontype = TypeButton.textContent;

    const filteredPokes = pokemons.filter(({ type }) => type === buttontype);

    const pokes = [];
    for (let index = 0; index < filteredPokes.length; index += 1) {
      const { type, name } = filteredPokes[index];
      if (!pokes.includes(name)) expect(type).toBe(buttontype);
      pokes.push(name);
      fireEvent.click(nextPokeButton);
    }
  });

  it('When select button "all" it should reset the filter', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(PokedexWithProps);

    const button = getAllByTestId('pokemon-type-button');
    const TypeButton = button[1];
    expect(TypeButton).toBeInTheDocument();

    const buttontype = TypeButton.textContent;

    const filteredPokes = pokemons.filter(({ type }) => type === buttontype);
  });
});
