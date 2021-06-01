import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
// import Podedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

describe('tests the <Pokedex /> component', () => {
  test('if page contains an h2 heading with the text Encountered Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading2).toBeInTheDocument();
  });
  describe('Next Pokémon button', () => {
    test('click on the button displays next Pokémon in the list', () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const currentPokemon = getByTestId('pokemon-name').innerHTML;
      fireEvent.click(getByText('Próximo pokémon'));
      const nextPokemon = getByTestId('pokemon-name').innerHTML;
      expect(currentPokemon).not.toBe(nextPokemon);
    });
    test('The button should contain the text Next pokémon', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText('Próximo pokémon');
      expect(button).toBeInTheDocument();
    });
    // test('If Pokemons are shown one at a time', () => {
    //   const { getByTestId } = renderWithRouter(<App />);
    //   const displayedPokemon = getByTestId('pokemon-name').innerHTML;
    //   const expectedPokemon = data.filter((pokemon, index) => {
    //     if (pokemon.name === displayedPokemon) {
    //       return index;
    //     }
    //     if (index === data.length) {
    //       return (index[0]);
    //     }
    //     return (index + 1);
    //   });
    //   expect().toBe();
    // });
    // test('After the last pokémon when clicking the button goes back to the first', () => {

    // });
    test('botões de filtro', () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const arrayBotao = getAllByTestId('pokemon-type-button');
      const sete = 7;
      const tipoBotao = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon'];
      expect(arrayBotao.length).toBe(sete);
      tipoBotao.forEach((nomeBotao, index) => {
        expect(nomeBotao).toBe(arrayBotao[index].innerHTML);
      });
    });
    test('botaoAll', () => {
      const { getByText } = renderWithRouter(<App />);
      const textBotao = getByText('All');
      expect(textBotao).toBeInTheDocument();
    });
    test('botão All reinicia os filtros', () => {
      const { getByText } = renderWithRouter(<App />);
      const pikachu = getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
      fireEvent.click(getByText('Fire'));
      const charmander = getByText('Charmander');
      expect(charmander).toBeInTheDocument();
      fireEvent.click(getByText('All'));
      const pikachu2 = getByText('Pikachu');
      expect(pikachu2).toBeInTheDocument();
    });
  });
});
