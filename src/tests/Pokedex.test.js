import React from 'react';
import renderWithRoute from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Request 5', () => {
  it('if contains a heading lvl 2 with following text', () => {
    const { getByRole } = renderWithRoute(<Pokedex />);
    const h2 = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
});
