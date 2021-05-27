import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
// PEGuntas : receber props dentro do test. Pq ter que usar o getByText no expceted

test('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
  renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(linkDetails);

  const { name, summary } = pokemons[0];
  const headingSummary = screen.getByRole('heading', {
    name: /Summary/i,
    level: 2,
  });
  const pokemonName = screen.getByRole('heading', {
    name: `${name} Details`,
    level: 2,
  });
  const summaryPokemon = screen.getByText(summary);

  expect(pokemonName).toBeInTheDocument();
  expect(linkDetails).not.toBeInTheDocument();
  expect(headingSummary).toBeInTheDocument();
  expect(summaryPokemon).toBeInTheDocument();
});

test('Teste se existe na pagina as localizações do pokémon', () => {
  renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(linkDetails);

  const { name, foundAt } = pokemons[0];
  const pokemonLocation = screen.getByRole('heading', {
    name: `Game Locations of ${name}`,
    level: 2,
  });
  expect(pokemonLocation).toBeInTheDocument();

  foundAt.forEach(({ location, map }, index) => {
    const locations = screen.getByText(location);
    expect(locations).toBeInTheDocument();
    const imageMap = screen.getAllByRole('img', {
      name: `${name} location`,
    });
    expect(imageMap[index]).toHaveAttribute('src', map);
  });
});

test('Teste se o usuário pode favoritar um pokémon.', () => {
  renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });

  userEvent.click(linkDetails);

  const checkboxFavorite = screen.getByRole('checkbox', {
    name: 'Pokémon favoritado?' });

  expect(checkboxFavorite).toBeInTheDocument();

  userEvent.click(checkboxFavorite);
  expect(checkboxFavorite).toBeChecked();

  userEvent.click(checkboxFavorite);
  expect(checkboxFavorite).not.toBeChecked();
});
