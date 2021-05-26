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
    const pokemonType = screen.getByText(type);
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByRole('img', {
      name: `${pokemonName} sprite`,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', image);
    userEvent.click(nextPokemon);
  });
});
