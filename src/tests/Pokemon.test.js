import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se é renderizado um card com as informações do pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByText } = renderWithRouter(<App />);
    const name = /Pikachu/i;
    expect(getByText(name)).toBeDefined();
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato', () => {
    const { getByText } = renderWithRouter(<App />);
    const name = /Average weight: 6.0 kg/i;
    expect(getByText(name)).toBeDefined();
  });
  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
});

test('Test se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
  const { getByRole } = renderWithRouter(<App />);
  const linkDetail = getByRole('link', {
    name: 'More details',
  });
  expect(linkDetail).toBeInTheDocument();
});

test('Teste se ao clicar no link de navegação do Pokémon, funciona ', () => {
  const { getByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(moreDetails);

  expect(screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  })).toBeInTheDocument();
});

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const markFavorite = getByRole('checkbox', {
    name: /Pokémon favoritado?/i,
  });
  userEvent.click(markFavorite);

  const favoriteIcon = screen.getByRole('img', {
    name: /Pikachu is marked as favorite/i,
  });
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
