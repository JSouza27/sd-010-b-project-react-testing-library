import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se as informações do pokemon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const resume = 'This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.';

    const getMoreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(getMoreDetailsLink);
    expect(getMoreDetailsLink).not.toBeInTheDocument();

    const titlePokemonDetails = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(titlePokemonDetails).toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(headingSummary).toBeInTheDocument();

    const resumeOfPokemon = screen.getByText(resume);
    expect(resumeOfPokemon).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas da localização do pokemon', () => {
    renderWithRouter(<App />);

    const TWO = 2;

    const getMoreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(getMoreDetailsLink);

    const gameLocationsTitle = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(gameLocationsTitle).toBeInTheDocument();

    const pokemonHabitatImg = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(pokemonHabitatImg.length).toBe(TWO);

    const nameOfLocation = screen.getByText('Kanto Viridian Forest');
    expect(pokemonHabitatImg[0]).toBeInTheDocument();
    expect(nameOfLocation).toBeInTheDocument();
    expect(pokemonHabitatImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonHabitatImg[0]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const getMoreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(getMoreDetailsLink);

    const getCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(getCheckbox);

    const getStarFavorite = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(getStarFavorite).toBeInTheDocument();
  });
});
