import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  // it('Teste se o card do Pokémon na Pokédex contém um link para detalhes', () => {
  //   renderWithRouter(<App />);

  //   const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  //   expect(linkMoreDetails).toBeInTheDocument();
  //   expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  // });

  // it('Teste se ao clicar, é feito o redirecionamento', () => {
  //   renderWithRouter(<App />);

  //   const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  //   userEvent.click(linkMoreDetails);

  //   const detailsHeading = screen.getByRole('heading', { name: /pikachu details/i });
  //   expect(detailsHeading).toBeInTheDocument();
  // });

  // it('Teste também se a URL exibida no navegador muda', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  //   userEvent.click(linkMoreDetails);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/pokemons/25');
  // });

  // it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  //   renderWithRouter(<App />);

  //   const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  //   userEvent.click(linkMoreDetails);

  //   const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  //   userEvent.click(favCheckbox);

  //   const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  //   expect(starIcon).toBeInTheDocument();
  //   expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  //   expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  // });
});
