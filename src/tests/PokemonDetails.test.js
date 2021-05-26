import React from 'react';
// import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

test('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
  // CRIEI ESSAS CONTANTES PRA TENTAR ME LIVRAR DOS WARNINGS.

  const func = () => {};
  const match = { params: { id: '25' } };
  const isPokemonFavoriteById = {};

  const { getByText, queryByText } = render(
    <MemoryRouter>
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        onUpdateFavoritePokemons={ func }
      />
    </MemoryRouter>,
  );

  const heading = getByText(`${pokemons[0].name} Details`);
  expect(heading).toBeInTheDocument();
  expect(queryByText(/more details/i)).not.toBeInTheDocument();
  const heading2 = getByText('Summary');
  expect(heading2).toBeInTheDocument();
  const paragraph = getByText(`${pokemons[0].summary}`);
  expect(paragraph).toBeInTheDocument();
});

test('Uma seção com os mapas contendo as localizações do pokémon', () => {
  const func = () => {};
  const isPokemonFavoriteById = {};
  const match = { params: { id: '25' } };
  const { getByText, getAllByAltText, getAllByRole } = render(
    <MemoryRouter>
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        onUpdateFavoritePokemons={ func }
      />
    </MemoryRouter>,
  );

  const heading = getByText(`Game Locations of ${pokemons[0].name}`);
  expect(heading).toBeInTheDocument();
  pokemons[0].foundAt.forEach((loc, index) => {
    const img = getAllByRole('img');
    expect(img[index + 1].src).toEqual(loc.map);
    const imgAlt = getAllByAltText(`${pokemons[0].name} location`);
    expect(imgAlt[index]).toBeInTheDocument();
  });
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const func = () => {};
  const match = { params: { id: '25' } };
  const isPokemonFavoriteById = {};

  const { getByLabelText } = render(
    <MemoryRouter>
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ func }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    </MemoryRouter>,
  );

  const inputCheck = getByLabelText('Pokémon favoritado?');
  expect(inputCheck).toBeInTheDocument();
  fireEvent.change(inputCheck, {
    target: 'on',
  });
  expect(inputCheck.value).toBe('on');
});
