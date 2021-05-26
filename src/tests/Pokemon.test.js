import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderRouter from './renderWithRoute';

import App from '../App';
import pokemons from '../data';

const { averageWeight } = pokemons[0];

describe('Teste dos cards dos Pokémons', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name').textContent;
    const pokeType = screen.getByTestId('pokemon-type').textContent;
    const pokeWeight = screen.getByTestId('pokemon-weight').textContent;
    const pokeImg = screen.getByRole('img').src;
    const imageAlt = screen.getByRole('img').alt;

    expect(pokeName).toBe(pokemons[0].name);
    expect(pokeType).toBe(pokemons[0].type);
    expect(pokeWeight).toBe(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokeImg).toBe(pokemons[0].image);
    expect(imageAlt).toBe(`${pokemons[0].name} sprite`);
  });
  test('Teste se o card do Pokémon indicado contém um link de navegação', () => {
    renderRouter(<App />);

    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });

    expect(pokeLink.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });
  test('Teste se é feito o redirecionamento', () => {
    renderRouter(<App />);
    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const summary = screen.getByText('Summary');

    expect(summary).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda', () => {
    const { history } = renderRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);

    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const atualPage = history.location.pathname;

    expect(atualPage).toBe(`/pokemons/${pokemons[1].id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderRouter(<App />);

    const pokeLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokeLink);

    const checkFav = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkFav);

    const favImage2 = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });
    const favImage = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImage2.src).toBe('http://localhost/star-icon.svg');
    expect(favImage).toBeInTheDocument();

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const favImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImg).toBeInTheDocument();
  });
});
