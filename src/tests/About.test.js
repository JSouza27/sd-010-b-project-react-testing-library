import React from 'react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('Requirement 2', () => {
  test('Testa se contem Pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const textPokedex = getAllByText(/Pokémons/i);

    expect(textPokedex.length).toBe(2);
  });
  test('Teste se a pagina tem dois titulos', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  test('Testa se contém a imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);
  });
});
