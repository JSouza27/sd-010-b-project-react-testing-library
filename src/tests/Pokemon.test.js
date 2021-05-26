import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pokemonCheck = (pok, typ, weight) => {
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(pok);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe(typ);
  const nextButton = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  const weightText = screen.getByText(`Average weight: ${weight} kg`);
  expect(weightText).toBeInTheDocument();
  const img = screen.getByRole('img');
  expect(img.alt).toBe(`${pok} sprite`);
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(img.src).not.toBe('');
  let { href } = linkDetails;
  const htmlSize = 26;
  href = href.slice(0, htmlSize);
  expect(href).toBe('http://localhost/pokemons/');
  userEvent.click(nextButton);
};

test('É renderizado um card com as informações de determinado pokémon', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  pokemonCheck('Pikachu', 'Electric', '6.0');
  pokemonCheck('Charmander', 'Fire', '8.5');
});

const pokemonsDetails = (pok, history) => {
  const detailsButton = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(detailsButton);
  const pokDetails = screen.getByText(`${pok} Details`);
  expect(pokDetails).toBeInTheDocument();
  let { href } = detailsButton;
  const htmlSize = 26;
  href = href.slice(htmlSize);
  expect(history.location.pathname).toBe(`/pokemons/${href}`);
  const favoriteCheck = screen.getByRole('checkbox');
  userEvent.click(favoriteCheck);
  const img = screen.getByRole('img', {
    name: `${pok} is marked as favorite`,
  });
  expect(img).toBeInTheDocument();
  let imgSrc = img.src;
  const htmlSrcSize = 16;
  imgSrc = imgSrc.slice(htmlSrcSize);
  expect(imgSrc).toBe('/star-icon.svg');
};

test('Clicar no link de navegação do Pokémon = detalhes de Pokémon', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  pokemonsDetails('Pikachu', history);
});
