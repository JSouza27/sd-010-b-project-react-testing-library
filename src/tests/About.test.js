import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test "About" component', () => {
  test('renders info about Pokédex', () => {
    const { getByTestId } = renderWithRouter(<About />);
    const info = getByTestId('pokedex');

    expect(info).toBeInTheDocument();
  });

  test('renders heading with "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(title).toBeInTheDocument();
  });

  test('renders 2 paragraphs about Pokédex', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('pokedex-info');

    expect(paragraphs).toHaveLength(2);
  });

  test('has image from Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /pokédex/i });
    const { src } = image;

    expect(image).toBeInTheDocument();
    expect(src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
