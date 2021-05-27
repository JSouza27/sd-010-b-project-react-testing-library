import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se os detalhades do Pokémon selecionado são mostradas na tela.', () => {
  test('A página deve ter um texto <name> Details;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const titlePikachu = screen.getByRole('heading', { name: /pikachu details/i });
    expect(titlePikachu).toBeInTheDocument();
  });

  test('Testa se link "More details" não é renderizado.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    expect(details).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const titleSummary = screen.getByRole('heading', { name: /summary/i });
    expect(titleSummary).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const paragraph = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Teste se existe uma seção com as localizações do pokémon', () => {
  test('teste se há um heading h2 com o texto Game Locations of <name>;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i });
    expect(gameLocation).toBeInTheDocument();
  });

  test('Testa as localizações do Pokémon na seção de detalhes;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const firstLocal = screen.getByText(/kanto viridian forest/i);
    expect(firstLocal).toBeInTheDocument();

    const secondLocal = screen.getByText(/kanto power plant/i);
    expect(secondLocal).toBeInTheDocument();
  });

  test('Testa exibição da localização e uma imagem do mapa em cada localização;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const firstLocal = screen.getByText(/kanto viridian forest/i);
    expect(firstLocal).toBeInTheDocument();

    const secondLocal = screen.getByText(/kanto power plant/i);
    expect(secondLocal).toBeInTheDocument();

    const totalLocal = screen.getAllByAltText('Pikachu location');
    expect(totalLocal.length).toBe(2);
  });

  test('A imagem da localização deve ter um atributo src com a URL;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const totalLocal = screen.getAllByAltText('Pikachu location');
    expect(totalLocal[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(totalLocal[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('Teste se o usuário pode favoritar através da página de detalhes.', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const btnCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(btnCheckbox).toBeInTheDocument();
  });
});
