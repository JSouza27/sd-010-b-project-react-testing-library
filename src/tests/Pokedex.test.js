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

    // verifica se em casa iteração do botão aparece um pokemon determinado.
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
});
