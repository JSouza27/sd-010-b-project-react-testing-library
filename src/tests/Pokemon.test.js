import React from 'react';
import { Pokemon } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações do pokémon.', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(getByText(/More details/i)).toBeInTheDocument();
    expect(getByText((params, { src }) => src === image)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`)).toBeInTheDocument();
  });
});
