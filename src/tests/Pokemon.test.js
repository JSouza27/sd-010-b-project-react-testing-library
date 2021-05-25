import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import { PokemonDetails } from '../components';

const pokemons = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('Requisito 6', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () =>{
    const { getByTestId, getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const { averageWeight } = pokemons;
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const img = getByRole('img');
    const link = getByText('More details');

    expect(name.innerHTML).toBe(pokemons.name);
    expect(type.innerHTML).toBe(pokemons.type);
    expect(weight.innerHTML)
      .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    expect(img.alt).toBe(`${pokemons.name} sprite`);
    expect(img.src).toBe(pokemons.image);
    expect(link.href).toBe(`http://localhost/pokemons/${pokemons.id}`);
    fireEvent.click(link);
    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('img', { name: `${pokemons.name} is marked as favorite` }).alt)
      .toBe(`${pokemons.name} is marked as favorite`);
    expect(getByRole('img', { name: `${pokemons.name} is marked as favorite` }).src)
      .toBe('http://localhost/star-icon.svg');
  });
});
