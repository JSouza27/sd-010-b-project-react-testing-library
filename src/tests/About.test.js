import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste do requisito 2', () => {
  it('Verifica se a página contém as informação sobre a Pokedéx', () => {
    const { getByRole } = renderWithRouter(<About />);

    const headingPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(headingPokedex).toBeInTheDocument();
  });

  it('Verifica se a pagina contém uma imagem', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imageAlt = getByAltText('Pokédex');

    expect(imageAlt).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
