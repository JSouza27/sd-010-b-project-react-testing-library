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
    const linkDetalhes = getByRole('link');
    expect(linkDetalhes.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        isFavorite
        pokemon={ mockedPokemon }
      />,
    );
    const starIcon = getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
