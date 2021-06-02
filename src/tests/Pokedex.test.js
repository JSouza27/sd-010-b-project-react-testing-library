import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <Pokedex.js />', () => {
  it('Testanto se página contém um heading', () => {
    renderWithRouter(<App />);
    const EncounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(EncounteredPokemons).toBeInTheDocument();
  });

  it('Testanto se é exibido o próximo Pokémon ao clicar no botão', () => {
    renderWithRouter(<App />);
    const buttonProximo = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    const pokemonName = screen.getByTestId('pokemon-name');

    userEvent.click(buttonProximo);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testanto se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonTipo = screen.getByRole('button', {
      name: /Psychic/i,
    });
    const pokemonName = screen.getByTestId('pokemon-name', {
      name: /Psychic/i,
    });

    userEvent.click(buttonTipo);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testanto se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonTodos = screen.getByRole('button', {
      name: /All/i,
    });
    const buttonProximo = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
      disabled: true,
    });

    userEvent.click(buttonTodos);
    expect(buttonProximo).toBeInTheDocument();
  });

  // Sugestão do forEach com ajuda de Fernada Porto
  it('Testanto se é criado, dinamicamente, um botão de filtro para cada Pokémon', () => {
    renderWithRouter(<App />);
    const buttonTipos = screen.getAllByTestId('pokemon-type-button');
    buttonTipos.forEach((tipo) => expect(tipo).toBeInTheDocument());
  });
});
