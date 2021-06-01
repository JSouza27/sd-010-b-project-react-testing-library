import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const mockedPokemon = pokemons[0];
const { id, name, type, image, averageWeight } = mockedPokemon;
const { measurementUnit, value } = averageWeight;

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    expect(getByText(weightText)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`).src).toBe(image);
  });

  test('O card do Pokémon contém um link de navegação para exibir mais detalhes.', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    const seeDetailsLink = getByRole('link');
    expect(seeDetailsLink.href).toBe(`http://localhost/pokemons/${id}`);
  });
});
