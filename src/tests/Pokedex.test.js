import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do requisito 5', () => {
  const NEXT_POKEMON = 'next-pokemon'; // lint requer que seja feito uma const para não ser declarado 3 vezes.
  it('teste se página contém um heading h2 com o texto encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const text = getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(text).toBeInTheDocument();
  });

  it('Verifica se há um botão com o texto Próximo pokémon', () => {
    // const { getByRole } = renderWithRouter(
    //   <Pokedex
    //     pokemons={ pokemons }
    //     isPokemonFavoriteById={ isPokemonFavoriteById }
    //   />
    // );

    const { getByText } = renderWithRouter(<App />);

    const text = getByText('Próximo pokémon');

    expect(text).toBeInTheDocument();
  });

  it('Verifica se os próximos pokémons da lista são mostrados', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const btn = getByTestId(NEXT_POKEMON);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(btn);
    });

    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button');

    expect(btnType).toBeDefined();
  });

  it('Testa se a Pokédex circula somente pelos pokémons de um tipo selecionado', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);

    const btnNext = getByTestId(NEXT_POKEMON);
    const btnType = getAllByTestId('pokemon-type-button');

    fireEvent.click(btnType[1]);
    pokemons.forEach((pokemon) => {
      if (pokemon.type === 'Fire') {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        fireEvent.click(btnNext);
      }
    });
  });

  it('Verifica se texto do botão corresponde ao nome do tipo', () => {
    const { getByRole } = renderWithRouter(<App />);

    pokemons.forEach(({ type }) => {
      const btnText = getByRole('button', {
        name: type,
      });

      expect(btnText).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);

    const btnNext = getByTestId(NEXT_POKEMON);
    const textBtn = getByRole('button', {
      name: 'All',
    });
    expect(textBtn).toBeInTheDocument();
    fireEvent.click(textBtn);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(btnNext);
    });
  });

  it('Testa se existe um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    pokemons.forEach(({ type }) => {
      const btnRole = getByRole('button', {
        name: type,
      });
      expect(btnRole).toBeInTheDocument();
    });
  });
});
