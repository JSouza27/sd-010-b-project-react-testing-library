import React from 'react';

import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente "About"', () => {
  test('Verifica se há o título "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const aboutPokedex = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Verifica se a imagem é da Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const pokedexImg = getByAltText('Pokédex');
    const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.src).toBe(IMG_URL);
  });
});
