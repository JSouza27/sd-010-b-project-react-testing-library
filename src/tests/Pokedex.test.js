import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

const isPokemonFavoriteById = {};

describe('Testing pokedex component', () => {
  it('render a h2 element with encountered pokémons text', () => {
    render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
        )
      </Router>,
    );
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('next button shows up a new pokemon', () => {
    render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
        )
      </Router>,
    );
    const firstPokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(firstPokemon).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);

    const nextPokemon = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(nextPokemon).toBeInTheDocument();
  });
  it('if shows up only a pokemon by turn', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const pokemonCard = screen.getAllByRole('img');
    expect(pokemonCard.length).toBe(1);
  });
  it('pokedex has filter buttons', () => {
    render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
        )
      </Router>,
    );
    const NUMBER_SEVEN = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(NUMBER_SEVEN);
  });
  it('a button that reset filter type', () => {
    render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
        )
      </Router>,
    );
    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /fire/i }));
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(pikachu).toBeInTheDocument();
  });
});
