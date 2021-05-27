import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('requisito 5', () => {
  const textProximoPokemon = 'Próximo pokémon';
  test('Page have text with Encountered pokémons in the h2 tag', () => {
    renderWithRouter(<App />);

    const h2Text = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });

    expect(h2Text).toBeInTheDocument();
  });

  test('Button next pokemon go to next pokemon', () => {
    renderWithRouter(<App />);

    const btnNextPokemon = screen.getByText(textProximoPokemon);
    expect(btnNextPokemon).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('If is last pokemon the button next pokemon come back to first pokemon', () => {
    const { length } = data;
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByText(textProximoPokemon);

    for (let cont = 0; cont < length; cont += 1) {
      fireEvent.click(btnNextPokemon);
    }
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Show only one pokemon at a time', () => {
    renderWithRouter(<App />);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
    expect(screen.queryByText('Ekans')).not.toBeInTheDocument();
    expect(screen.queryByText('Alakazam')).not.toBeInTheDocument();
  });

  test('Show only pokemons Psychic, before show first pokemon Psychic', () => {
    const pokemonsPsychic = data.filter((pokemon) => pokemon.type === 'Psychic');
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(buttonPsychic);

    pokemonsPsychic.forEach(({ name }) => {
      expect(screen.queryByText(name)).toBeInTheDocument();
      fireEvent.click(screen.queryByText(textProximoPokemon));
    });

    // show firt pokemon Psychic
    expect(screen.queryByText(pokemonsPsychic[0].name)).toBeInTheDocument();
  });

  test('Pokedex have button reset with name All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    expect(screen.queryByText(data[0].name)).toBeInTheDocument();

    fireEvent.click(buttonAll);

    data.forEach(({ name }) => {
      expect(screen.queryByText(name)).toBeInTheDocument();
      fireEvent.click(screen.queryByText(textProximoPokemon));
    });

    expect(screen.queryByText(data[0].name)).toBeInTheDocument();
  });

  test('Have a button of filter for each pokemon type', () => {
    const pokemonsTypes = [...new Set(data.map(({ type }) => type))];
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    pokemonsTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
      expect(buttonType.getAttribute('data-testid')).toBe('pokemon-type-button');
    });
  });

  test('The button of next is disable if have only one pokemon type', () => {
    renderWithRouter(<App />);

    const buttonTypeEletric = screen.getByRole('button', { name: 'Electric' });
    fireEvent.click(buttonTypeEletric);

    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNextPokemon).toBeDisabled();
  });
});

// getAtribute -> https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a
