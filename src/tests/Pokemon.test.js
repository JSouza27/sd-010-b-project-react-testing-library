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
    expect(pokemonName).toHaveTextContent(`${name}`);

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const img = getByAltText(`${name} sprite`);
    expect(img.src).toBe(image);
  });

  test(`'este se o card do Pokémon indicado na Pokédex 
    contém um link de navegação para exibir detalhes deste 
    Pokémon. O link deve possuir a URL /pokemons/<id>, onde 
    <id> é o id do Pokémon exibido'`, () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/details/i);
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
});
