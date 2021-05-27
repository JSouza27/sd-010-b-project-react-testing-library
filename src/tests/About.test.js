import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando toda a aplicação da tela About', () => {
  it('imagem da pokedex na tela', () => {
    renderWithRouter(<About />);

    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });

  it('Verifica se o título aparece na tela', () => {
    renderWithRouter(<About />);
    const H2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(H2).toBeInTheDocument();
  });
});
