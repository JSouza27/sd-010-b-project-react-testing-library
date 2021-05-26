import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o arquivo About', () => {
  it('Testa se está na página Pokedex', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);

    fireEvent.click(about);
    const aboutPokedex = getByText(/About Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa se há uma imagem em About', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);

    // Selecionar os elementos html através do dom também funciona
    // const imagem = document.querySelector('img');
    // expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    const imagem = getByAltText(/Pokédex/);
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
