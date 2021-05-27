import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

const auxPoke = 'Próximo pokémon';

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
      data.forEach(({name}) => expect(getAllByText(name)));
    });
  });

  /* test('', () => {});
  test('', () => {});
  test('', () => {});
  test('', () => {});
  test('', () => {}); */
});
