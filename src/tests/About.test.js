import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import About from '../components/About';

describe('Teste component About', () => {
  test('Pagina contem um heading com text About Pokedex', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Contém img de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');

    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  test('Página contém dois paragrafos-1', () => {

  });
  ttest('Página contém dois paragrafos-2', () => {

  });
});
