import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Testa a renderização do Pokémon', () => {
  test('Testa os textos do card do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa o link de detalhes', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByText(moreDetails);
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
  });

  // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
  test('testa o direcionamento para o link de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByText(moreDetails);
    userEvent.click(pokemonLink);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('testa se há o ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByText(moreDetails);
    userEvent.click(pokemonLink);
    const favoriteLink = screen.getByRole('checkbox');
    userEvent.click(favoriteLink);
    const favoriteImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
