import React from 'react';
import { fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemon from '../data';

const MoreDetails = 'More details';

test('Testando toda a aplicação da tela PokemonDetails', () => {
  const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);

  const details = getByRole('link', {
    name: MoreDetails,
  });
  fireEvent.click(details);

  // Verificando se não existe o link de mais detalhes
  expect(details).not.toBeInTheDocument();

  // Verificando Título de Detalhes
  const titleDetails = getAllByRole('heading', {
    level: 2,
    name: `${pokemon[0].name} Details`,
  });
  expect(titleDetails[0]).toBeInTheDocument();

  // Verificando Título Sumário
  const titleSummary = getAllByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(titleSummary[0]).toBeInTheDocument();

  // Verificando as informações do pokémon que estão no parágrafo do Sumário
  const pokemonInfo = getByText(`${pokemon[0].summary}`);
  expect(pokemonInfo).toBeInTheDocument();

  // Verificando Título Game Locations
  const titleGameLocations = getAllByRole('heading', {
    level: 2,
    name: `Game Locations of ${pokemon[0].name}`,
  });
  expect(titleGameLocations[0]).toBeInTheDocument();

  // Verificando Imagens do Game Locations
  const imgGameLocations = getAllByRole('img');
  expect(imgGameLocations[1].src).toBe(`${pokemon[0].foundAt[0].map}`);
  expect(imgGameLocations[1].alt).toBe(`${pokemon[0].name} location`);
  expect(imgGameLocations[2].src).toBe(`${pokemon[0].foundAt[1].map}`);
  expect(imgGameLocations[2].alt).toBe(`${pokemon[0].name} location`);

  // Verificando Pokemon Favorito
  const favoritePokemon = getByText(/Pokémon favoritado?/i);
  expect(favoritePokemon).toBeInTheDocument();
});
