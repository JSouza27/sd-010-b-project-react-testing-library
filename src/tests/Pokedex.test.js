import React from 'react';
import { Pokedex } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Testa se página contém um h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<Pokedex />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
