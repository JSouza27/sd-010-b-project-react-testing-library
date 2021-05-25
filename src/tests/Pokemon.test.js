import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';
import data from '../data';

describe('Teste requisito 5 Pokemon.js ', () => {
  test(`'Teste se é renderizado um card com as informações
   de determinado pokémon'`, () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const { name, image } = data[0];

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const img = getByAltText(`${name} sprite`);
    expect(img.src).toBe(image);
  });
});
