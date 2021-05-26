import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o componente <Pokedex />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
});
