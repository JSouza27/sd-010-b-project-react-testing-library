import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando página Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });
});
