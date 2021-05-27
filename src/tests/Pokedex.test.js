import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading - Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto Próximo pokémon;
    const txtBtnNext = screen.getByText(/próximo pokémon/i);
    expect(txtBtnNext).toBeInTheDocument();
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    for (let index = 0; index < pokemons.length; index += 1) {
      const namePokemon = screen.getByText(pokemons[index]);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(btnNext);
    }
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNext);
    const linkMoreDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(linkMoreDetails.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnFilters = screen.getAllByTestId('pokemon-type-button');
    const typesPokemons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    btnFilters.forEach((btn, index) => {
      expect(btn.textContent).toBe(typesPokemons[index]);
    });
  });
  // it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  //   renderWithRouter(<App />);
  //   const btnAll = screen.getByRole('button', { name: /all/i });
  //   expect(btnAll.textContent).toBe('All');

  //   const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
  //   userEvent.click(btnNext);
  //   const btnBug = screen.getByRole('button', { name: /bug/i });
  //   userEvent.click(btnBug);
  //   userEvent.click(btnAll);

  //   const pikachu = screen.getByText(/pikachu/i);
  //   expect(pikachu).toBeInTheDocument();
  // });
  // it('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
  //   renderWithRouter(<App />);
  //   const btnEletric = screen.getByRole('button', { name: /electric/i });
  //   userEvent.click(btnEletric);

  //   const textType = screen.getByTestId('pokemon-type');
  //   expect(textType.textContent).toBe('Electric');

  //   const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
  //   expect(btnNext).toHaveAttribute('disabled');

  //   const btnPsychic = screen.getByRole('button', { name: /psychic/i });
  //   userEvent.click(btnPsychic);
  //   userEvent.click(btnNext);
  //   expect(textType.textContent).toBe('Psychic');
  // });
});
