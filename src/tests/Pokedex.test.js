import React from 'react';
import { fireEvent, getAllByText, getByAltText, getByText } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Data from '../data';
// import Pokedex from '../components/Pokedex';

describe('testes na Pokedex.js', () => {
  test('Testando a exibição da H2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(home).toBeInTheDocument();
  });
  test('Testando a lista de pokemon é exibida', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    const pikachu = getByText('Pikachu');
    fireEvent.click(nextButton);
    const chamander = getByText('Charmander');
    expect(chamander).toBeInTheDocument();
    Data.forEach((pokemon) => {
    //   fireEvent.click(nextButton);
    //   const pokemonName = getByText(pokemon.name)
    // expect(pokemonName).toBeInTheDocument();
      if (pokemon.name === 'Dragonair') {
        fireEvent.click(nextButton);
        expect(pikachu).toBeInTheDocument();
      }
    });
  });
  test('Testando se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const testId = getAllByTestId('pokemon-name');
    expect(testId).toHaveLength(1);
  });
  test('Testando o botão de filtro', () => {
    const { getByText } = renderWithRouter(<App />)
    const bug = getByText('Bug');
    fireEvent.click(bug);
    const caterpie = getByText('Caterpie');
    expect(caterpie).toBeInTheDocument() 
  });
  test('Testando botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />)
    const all = getByText('All')
    fireEvent.click(all)
    const pikachu = getByText('Pikachu')
    expect(pikachu).toBeInTheDocument();
    const next = getByText('Próximo pokémon');
    fireEvent.click(next)
    const charmander = getByText('Charmander')
    expect(charmander).toBeInTheDocument()
  })
  test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { container } = renderWithRouter(<App />)
    const button = container.querySelectorAll('button');
    const array = ['All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']
    button.forEach((btn, i) => {
     if (btn.innerHTML === array[i]){
    //  if (btn.innerHTML === 'All'){
    //   return expect(btn.textContent).toBe(array[i]);
    //  }
     expect(btn.textContent).toBe(array[i]);
     expect(btn).toHaveAttribute('data-testid');
    }
    })
  })
  test('Testando o botão de Próximo se está desabilitado quando a lista é filtrada', () => {
    const { getByText } = renderWithRouter(<App />)
    const bug = getByText('Bug');
    fireEvent.click(bug);
    const next = getByText('Próximo pokémon')
    expect(next).toHaveAttribute('disabled')
  })
  //https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
});
