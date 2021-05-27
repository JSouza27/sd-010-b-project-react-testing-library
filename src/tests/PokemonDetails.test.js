import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pokemonsDetails = () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detailsButton = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(detailsButton);
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  console.log(pokemonName);
  const detailsH2 = screen.getByRole('heading', {
    level: 2,
    name: /details/i,
  });
  expect(detailsH2.innerHTML).toBe(`${pokemonName} Details`);
  const summary = screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(summary).toBeInTheDocument();
  const summaryText = summary.parentElement;
  expect(summaryText.childNodes[1]).toBeInTheDocument();
  expect(summaryText.childNodes[1].innerHTML).not.toBe('');
  const gameLocations = screen.getByRole('heading', {
    level: 2,
    name: /game locations/i,
  });
  expect(gameLocations.innerHTML).toBe(`Game Locations of ${pokemonName}`);
  const imgLocation = screen.getAllByRole('img', {
    name: /location/i,
  });
  for (let index = 0; index < imgLocation.length; index += 1) {
    expect(imgLocation[index].src).not.toBe('');
    expect(imgLocation[index].alt).toBe(`${pokemonName} location`);
  }
  const checkFavorite = screen.getByRole('checkbox', {
    name: /Pokémon Favoritado/i,
  });
  expect(checkFavorite).toBeInTheDocument();
};

test('Informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  pokemonsDetails();
});
