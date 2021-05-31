import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

import App from '../App';

describe('Requisito 05 = Pokedex.js', () => {
  test('Teste se é exibido o titulo \'Encountered pokémons\'.', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i, // regex
    })).toBeInTheDocument();
  });

  test('Teste se existe o botão próximo', () => {
    renderWithRouter(<App />);

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('Testar se após o último pokémon a aplicação deve voltar para o primerio', () => {
    renderWithRouter(<App />);
    const { length } = data;
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();

    /* Outra maneira que podeira ser feito usando getByText */
    // const textProximoPokemon = /Próximo pokémon/i;
    // const btnNextPokemon = screen.getByText(textProximoPokemon);

    for (let cont = 0; cont < length; cont += 1) {
      fireEvent.click(btnNextPokemon);
    }
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Dragonair')).not.toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pokemonsPsychic = data.filter((pokemon) => pokemon.type === 'Psychic');
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(btnPsychic);

    pokemonsPsychic.forEach(({ name }) => {
      expect(screen.queryByText(name)).toBeInTheDocument();
      const textProximoPokemon = /Próximo pokémon/i;
      fireEvent.click(screen.queryByText(textProximoPokemon));
    });

    // Exibi primeiro Pokémon Psychic
    expect(screen.queryByText(pokemonsPsychic[0].name)).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    expect(screen.queryByText(data[0].name)).toBeInTheDocument();

    fireEvent.click(btnAll);

    data.forEach(({ name }) => {
      const textProximoPokemon = /Próximo pokémon/i;
      expect(screen.queryByText(name)).toBeInTheDocument();
      fireEvent.click(screen.queryByText(textProximoPokemon));
    });

    expect(screen.queryByText(data[0].name)).toBeInTheDocument();
  });

  test(`Teste se é criado, dinamicamente,
  um botão de filtro para cada tipo de Pokémon.`, () => {
    renderWithRouter(<App />);
    const pokemonsTypes = [...new Set(data.map(({ type }) => type))];

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    pokemonsTypes.forEach((type) => {
      const btnType = screen.getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();
      expect(btnType.getAttribute('data-testid')).toBe('pokemon-type-button');
    });
  });

  test('Teste se o botão próximo está desabilitado', () => {
    renderWithRouter(<App />);
    const btnTypeEletric = screen.getByRole('button', { name: 'Electric' });
    fireEvent.click(btnTypeEletric);

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeDisabled();
  });
});
