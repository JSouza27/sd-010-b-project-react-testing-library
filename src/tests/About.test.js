import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Testando toda a aplicação da tela About', () => {
  it('Verifica se o título aparece na tela', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a imagem Pokédex está na tela', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
