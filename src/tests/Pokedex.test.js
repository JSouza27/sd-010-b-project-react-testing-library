import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import pokemonsList from '../data';
import App from '../App';

const xablau = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    }));
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', {
      name: /Próximo pokémon/i,
    }));
  });

  test('Os próximos Pokémons da lista devem ser mostrados, um a um', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(xablau);
    const botao = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(botao);
    expect(pokemonName.textContent).toBe('Charmander');
  });

  test('se estiver no último Pokémon da lista ir para o primeiro', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(xablau);
    const botao = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    for (let index = 0; index < pokemonsList.length; index += 1) {
      fireEvent.click(botao);
    }

    expect(pokemonName.textContent).toBe(pokemonsList[0].name);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    pokemonsList.forEach(({ type }) => {
      const btnFiltro = screen.getByRole('button', { name: type });

      fireEvent.click(btnFiltro);
      const pokemonAtual = screen.getByTestId('pokemon-type');
      expect(pokemonAtual).toHaveTextContent(type);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');

    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    buttons.forEach((button, index) => {
      expect(button.textContent).toBe(types[index]);
    });
  });

  test('Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const reset = screen.getByRole('button', { name: 'All' });

    fireEvent.click(reset);
    const currentPokemon = screen.getByTestId(xablau);

    expect(reset).toBeInTheDocument();
    expect(currentPokemon.textContent).toBe('Pikachu');
  });
});
