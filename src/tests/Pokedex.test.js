import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

// test('', () => {});
describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex />);
    const encontrou = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(encontrou).toBeInTheDocument();
  });
});
