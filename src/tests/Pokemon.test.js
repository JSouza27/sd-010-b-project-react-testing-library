import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe(`Teste se é renderizado um card
  com as informações de determinado pokémon`, () => {
  test('Verificar se é renderizado o nome do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const nomePokemon = screen.getByText('Pikachu');

    expect(nomePokemon).toBeInTheDocument();
  });

  test('Verificar se é renderizado o tipo do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const typePokemon = screen.getByTestId('pokemon-type');

    expect(typePokemon).toHaveTextContent('Electric');
  });

  test('Verificar se é renderizado o peso do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const averageWeightPokemon = screen.getByText('Average weight: 6.0 kg');

    expect(averageWeightPokemon).toBeInTheDocument();
  });

  test('Verificar se a imagem correta do pokémon é mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const spritePokemon = screen.getByAltText('Pikachu sprite');

    expect(spritePokemon.alt).toBe('Pikachu sprite');
    expect(spritePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Verificar se na Pokédex contém um link
  de navegação de redirecionamento para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });

    fireEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Testando se existe um ícone de estrela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });

    fireEvent.click(moreDetails);

    const { location: { pathname } } = history;
    const firstPokemonRoute = '/pokemons/25';

    expect(pathname).toBe(firstPokemonRoute);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    fireEvent.click(favoritePokemon);

    const pokemonClicked = screen.getAllByRole('img', {
      exact: false,
      alt: 'Pikachu is marked as favorite',
      src: '/star-icon.svg',
    });

    expect(pokemonClicked[1].alt).toBe('Pikachu is marked as favorite');
    expect(pokemonClicked[1].src).toMatch('/star-icon.svg');
  });
});
