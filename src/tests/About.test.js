import React from 'react';
import About from '../components/About'
import renderWithRouter from './renderWithRouter';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const textH2 = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textH2).toBeInTheDocument();
  })

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphQuant = getAllByText(/Pokémons/);
    expect(paragraphQuant.length).toBe(2);
  });

  test('Testa se a página contém imagen.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  })
})

