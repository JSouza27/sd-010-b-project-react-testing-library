import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonDetails);

    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    const SummaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    const resumoPokemon = screen.getByText(/This intelligent Pokémon roasts /i);

    expect(detailsTitle).toBeInTheDocument();
    expect(buttonDetails).not.toBeInTheDocument();
    expect(SummaryTitle).toBeInTheDocument();
    expect(resumoPokemon).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonDetails);

    const MapOfLocation = screen.queryAllByRole('img', {
      name: /pikachu location/i,
    });

    const GameLocation = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(MapOfLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(GameLocation).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(buttonDetails);

    const isFavorite = screen.getByText(/pokémon favoritado\?/i);
    expect(isFavorite).toBeInTheDocument();
  });
});
