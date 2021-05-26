import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testa o componente <Pokedex />', () => {
  test('Teste se página contém um h2 com o texto "Encountered pokémons."', () => {
    RenderWithRouter(<App />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se clicando no botão é exibido o próximo Pokémon da lista.', () => {
    RenderWithRouter(<App />);
    // Feito em colaboração com Rafael Mathias, Renan Braga, João Herculano,

    const numberOfClicks = 9;
    const namesPokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    // verifica se em casa iteração do botão aparece um pokemon determinado do array.
    for (let index = 0; index < numberOfClicks; index += 1) {
      userEvent.click(btnNext);
      const nextPokemon = screen.getByText(namesPokemons[index]);
      expect(nextPokemon).toBeInTheDocument();
    }
  });

  test('Testa se volta ao "Pikachu" após passar pelo o "Dragonair"', () => {
    RenderWithRouter(<App />);
    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const numberOfClicks = 9;
    for (let index = 0; index < numberOfClicks; index += 1) {
      userEvent.click(btnNext);
    }

    const containsPokémon = screen.getByText(/pikachu/i);
    expect(containsPokémon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    RenderWithRouter(<App />);
    const quantityThatAppears = screen.getAllByText(/More details/i);
    expect(quantityThatAppears.length).toBe(1);
  });

  test('Selecionando um tipo de botão, a app deve circular apenas nele', () => {
    RenderWithRouter(<App />);
    const typesButtonsFilter = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button, index) => {
      expect(button.textContent).toBe(typesButtonsFilter[index]);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;', () => {
    RenderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(btn);
    const allTypePokemons = screen.getByTestId('pokemon-type');

    expect(allTypePokemons.textContent).toBe('Psychic');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll.textContent).toBe('All');

    userEvent.click(btnAll);
    const nameFirstPkemon = screen.getByText(/pikachu/i);
    expect(nameFirstPkemon).toBeInTheDocument();

    // podera ser refatorado para mais teste;
  });
});
