import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByText, getAllByText, getByAltText } = render(
    <MemoryRouter>
      <Pokemon pokemon={ pokemons[0] } isFavorite />
    </MemoryRouter>,
  );

  const poke = pokemons[0];
  expect(getByText(poke.name)).toBeInTheDocument();
  expect(getAllByText(poke.type)).toBeDefined();
  expect(
    getByText(
      `Average weight: ${poke.averageWeight.value} ${poke.averageWeight.measurementUnit}`,
    ),
  ).toBeInTheDocument();
  const img = getByAltText(`${poke.name} sprite`);
  expect(img.src).toEqual(poke.image);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokemon pokemon={ pokemons[0] } isFavorite />
    </MemoryRouter>,
  );
  const poke = pokemons[0];
  const link = getByText(/more details/i);
  expect(link.href).toContain(`/pokemons/${poke.id}`);
});

test('Testa se, ao clicar no link, redireciona para a página de detalhes', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemons[0] } isFavorite />
    </Router>,
  );

  const poke = pokemons[0];
  const link = getByText(/more details/i);
  fireEvent.click(link);
  expect(history.location.pathname).toBe(`/pokemons/${poke.id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <Pokemon pokemon={ pokemons[0] } isFavorite />
    </MemoryRouter>,
  );
  const poke = pokemons[0];
  const img = getByAltText(`${poke.name} is marked as favorite`);
  expect(img.src).toContain('/star-icon.svg');
});
