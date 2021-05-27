import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    expect(nome.innerHTML).toBe(Data[0].name);
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const tipo = getByTestId('pokemon-type');
    expect(tipo.innerHTML).toBe(Data[0].type);
  });
  test('O peso médio do pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const peso = Data[0].averageWeight.value;
    console.log(peso);
    const unidade = Data[0].averageWeight.measurementUnit;
    console.log(unidade);
    const resul = getByTestId('pokemon-weight').innerHTML;
    expect(resul).toBe(`Average weight: ${peso} ${unidade}`);
  });
});
