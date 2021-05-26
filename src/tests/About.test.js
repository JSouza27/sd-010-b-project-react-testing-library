import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('teste no componente About.js', () => {
  test('testando se o componente h2 posssui texto About Pokedéx', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('testando se dois valores no componente <p>', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });
  test('testando se a página renderiza a imagem com src Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const altText = getByAltText('Pokédex');
    expect(altText).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
