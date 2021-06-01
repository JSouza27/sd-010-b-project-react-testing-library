import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js /', () => {
  test('Teste se página contém um heading h2 com o texto `Encountered pokémons`.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
