import React from 'react';
import App from '../App';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testando App', () => {
  test('Testar se a um H1 com o texto pokedex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Pokédex/i);
  });
});
