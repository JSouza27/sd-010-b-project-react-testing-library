import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRoute from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = 'pokemon-name';

describe('Request 5', () => {
  it('if contains a heading lvl 2 with following text', () => {
    renderWithRoute(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  describe('test if the page shows te next pokemon', () => {
    it('contains a button for next pokemon and it works right', () => {
      renderWithRoute(<App />);

      const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNext).toBeInTheDocument();

      fireEvent.click(btnNext);

      const nxtPokemon = screen.getByTestId(pokemon);
      expect(nxtPokemon).toHaveTextContent(/charmander/i);
    });

    it('shows the 1st pokemon when the list ends', () => {
      renderWithRoute(<App />);

      const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNext).toBeInTheDocument();

      const firstPokemon = screen.getByTestId(pokemon);

      pokemons.forEach((pkmn, index) => {
        if (pkmn[index] < pokemons.length) {
          fireEvent.click(btnNext);
        }
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      });
    });
  });

  it('have filter buttons', () => {
    renderWithRoute(<App />);

    const filter = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(filter);

    const pkmn = screen.getByTestId(pokemon);
    expect(pkmn).toHaveTextContent(/charmander/i);

    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(btnNext);
    expect(pkmn).toHaveTextContent(/rapidash/i);
  });

  it('have a button to reset filters', () => {
    renderWithRoute(<App />);

    const btnReset = screen.getByRole('button', { name: /all/i });
    fireEvent.click(btnReset);

    const firstPokemon = screen.getByTestId(pokemon);
    expect(firstPokemon).toHaveTextContent(/pikachu/i);
  });

  it('shows type filter buttons', () => {
    renderWithRoute(<App />);

    const btnReset = screen.getByRole('button', { name: /all/i });
    const btns = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = [];

    pokemons.filter((pokemonIdx) => (
      pokemonTypes.includes(pokemonIdx.type) ? null : pokemonTypes.push(pokemonIdx.type)
    ));
    expect(btns.length).toBe(pokemonTypes.length);
    expect(btnReset).toBeInTheDocument();
  });
});

// Requisito 5 feito com ajuda da Letícia Galvão, dando uma olhada na sua PR para resolver pequenos problemas que eu não havia entendido nesse requisito.
// src: https://github.com/tryber/sd-010-b-project-react-testing-library/pull/69
