import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);

  const nextPokemon = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  pokemons.forEach(({ name, type, image, averageWeight: { value, measurementUnit } }) => {
    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getAllByText(type);
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByRole('img', {
      name: `${name} sprite`,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveLength(2);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', image);
    userEvent.click(nextPokemon);
  });
});

test('Testa o card do Pokémon se tem link de navegação e o redirecionamento'
+ 'e testa se existe um ícone de estrela nos Pokémons favoritados. ', () => {
  const { history } = renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  const { id, name } = pokemons[0];
  expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);

  userEvent.click(linkDetails);

  const { pathname } = history.location;
  const checkboxFavorite = screen.getByRole('checkbox', {
    name: 'Pokémon favoritado?' });
  userEvent.click(checkboxFavorite);
  const imageStar = screen.getByRole('img', {
    name: `${name} is marked as favorite`,
  });

  expect(pathname).toBe(`/pokemons/${id}`);
  expect(imageStar).toHaveAttribute('src', '/star-icon.svg');
});
