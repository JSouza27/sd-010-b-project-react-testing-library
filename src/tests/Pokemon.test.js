import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <Pokemon />', () => {
  test('Teste renderiza um card com as informações exatas.', () => {
    RenderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imgPkemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPkemon).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imgPkemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = RenderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    RenderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);

    const starFavorite = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
