import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

const auxPoke = 'Próximo pokémon';
const aux = data.map(({ type }) => type);
const aux01 = aux.filter((type, index, array) => array.indexOf(type) === index);
const auxXablau = (velho) => data.filter(({ type }) => type === velho);

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedex = getByRole('heading', {
      level: 2,
    });
    expect(pokedex).toHaveTextContent('Encountered pokémons');
  });
  describe('Teste se é exibido o próximo Pokémon'
  + ' da lista quando o botão Próximo pokémon é clicado', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      const { getByText, getAllByText } = renderWithRouter(<App />);
      data.forEach(({ name }) => {
        expect(getAllByText('More details').length).toBe(1);
        expect(getByText(name)).toBeInTheDocument();
        fireEvent.click(getByText(auxPoke));
      });
      expect(getByText(data[0].name)).toBeInTheDocument();
    });
  });

  test('A partir da seleção de um botão de tipo,'
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button').length).toBe(aux01.length);
    aux01.forEach((name) => {
      fireEvent.click(getByRole('button', { name }));
      auxXablau(name).forEach(({ name: pokemon }) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(getByText(auxPoke));
      });
    });
    fireEvent.click(getByRole('button', { name: 'All' }));
    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(auxPoke));
    });
  });
  /* test('', () => {});
  test('', () => {});
  test('', () => {});
  test('', () => {}); */
});
