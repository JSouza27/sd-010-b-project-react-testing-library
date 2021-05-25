import React from 'react';
import renderWithRouter from '../components/renderWithRouter';

import About from '../components/About';

describe('Testa about', () => {
  test('testa h2', () => {
    const { getByRole } = renderWithRouter(<About />);

    const about = getByRole('heading', { level: 2 });
    expect(about).toHaveTextContent('About Pokédex');
  });

  test('Testa se renderiza 2 paragrafos, com as informações da Pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const texts = getAllByText(/Pokédex/i);
    expect(texts[0]).toBeInTheDocument();
    expect(texts[1]).toBeInTheDocument();
  });

  test('Testa se renderiza a imagem da Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining(url));
  });
});
