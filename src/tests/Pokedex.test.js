import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Testing the `Pokédex` component', () => {
  it('Test if pokedex page/home have a heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });

  it('test if the btn have text `Próximo pokémon`', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('button', { name: /próximo pokémon/i })).toBeInTheDocument();
  });
});
