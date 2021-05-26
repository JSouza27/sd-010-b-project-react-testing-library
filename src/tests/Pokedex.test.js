import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pokemonNameTestId = 'pokemon-name';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(h2).toBeInTheDocument();
});

test('É exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  let pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  const button = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  expect(pokemon).toBe('Pikachu');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Charmander');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Caterpie');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Ekans');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Alakazam');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Mew');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Rapidash');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Snorlax');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Dragonair');
  userEvent.click(button);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Pikachu');
});

test('É mostrado apenas um Pokémon por vez', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokemon = screen.getAllByTestId(pokemonNameTestId);
  expect(pokemon.length).toBe(1);
});

test('Pokédex tem os botões de filtro', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const filterButton = screen.getByRole('button', {
    name: 'Fire',
  });
  const filterId = screen.getAllByTestId('pokemon-type-button');
  expect(filterId[1].innerHTML).toBe('Fire');
  userEvent.click(filterButton);
  let pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Charmander');
  const nextButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  userEvent.click(nextButton);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Rapidash');
  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  userEvent.click(allButton);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Pikachu');
});
