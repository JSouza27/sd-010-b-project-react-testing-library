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
  test('heading h2 com o texto Game Locations of <name>;', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i });
    expect(gameLocation).toBeInTheDocument();
  });
});
