import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const onlyNames = [];
data.forEach((value) => onlyNames.push(value.name));

describe('Testando página Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnNextPokemon = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');
    expect(btnNextPokemon.textContent).toBe('Próximo pokémon');
    onlyNames.forEach((name) => {
      expect(pokemonName.textContent).toBe(name);
      fireEvent.click(btnNextPokemon);
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonNameArr = getAllByTestId('pokemon-name');
    expect(pokemonNameArr.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro e os mesmos funcionam', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btnDragon = getByRole('button', { name: 'Dragon' });
    fireEvent.click(btnDragon);
    const dragonair = getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: 'All' });
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(btnAll);
    expect(getByText(/Pikachu/i));
    fireEvent.click(btnNext);
    expect(getByText(/Charmander/i));
  });

  it('Testa se é criado dinamicamente um botão de filtro para cada tipo', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const seven = 7;
    const btnAll = getByRole('button', { name: 'All' });
    const btnTypeArr = getAllByTestId('pokemon-type-button');
    const typeList = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(btnTypeArr.length).toBe(seven);
    typeList.forEach((type) => {
      const btnType = getByRole('button', { name: [type] });
      expect(btnType).toBeInTheDocument();
      expect(btnAll).toBeVisible();
    });
  });
});
