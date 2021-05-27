import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const [,,,,,,,,
  dragonair,
] = pokemons;

const { averageWeight, id, image, name, type } = dragonair;
const { measurementUnit, value } = averageWeight;

describe(`Teste se é renderizado um card com
as informações de determinado pokémon.`, () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
  });

  it(`O peso médio do pokémon deve ser exibido com um texto no formato
Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    expect(pokemonAverageWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });

  it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a 
URL da imagem e um atributo alt com o texto <name> sprite, 
onde <name> é o nome do pokémon`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonImage = getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });
});
