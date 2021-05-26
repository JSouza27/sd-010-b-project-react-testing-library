import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test about page', () => {
  test('pokedex title', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(pageTitle).toBeInTheDocument();
  });

  test('if the page contains two paragraph about pokedex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });
  // **Source https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src */
  test('if the page contains the pokedex image', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
