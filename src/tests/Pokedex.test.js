import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente Not Found', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />);

    const PokedexText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(PokedexText).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando.', () => {
    renderWithRouter(<App />);

    const buttonProxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(buttonProxPokemon);

    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    const buttonElectric = screen.getByRole('button', {
      name: /electric/i,
    });
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    const buttonBug = screen.getByRole('button', {
      name: /bug/i,
    });
    const buttonPoison = screen.getByRole('button', {
      name: /Poison/i,
    });
    const buttonPsychic = screen.getByRole('button', {
      name: /Psychic/i,
    });
    const buttonNormal = screen.getByRole('button', {
      name: /Normal/i,
    });
    const buttonDragon = screen.getByRole('button', {
      name: /Dragon/i,
    });

    expect(buttonAll && buttonElectric).toBeInTheDocument();
    expect(buttonFire && buttonBug).toBeInTheDocument();
    expect(buttonPoison && buttonPsychic).toBeInTheDocument();
    expect(buttonNormal && buttonDragon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);

    const FirstPokemon = screen.getByText(/Pikachu/i);
    expect(FirstPokemon).toBeInTheDocument();
  });

  test('Se tem um botão de filtro para cada tipo de Pokémon.', () => {
    renderWithRouter(<App />);

    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilter[1]).toBeInTheDocument();
  });
});
