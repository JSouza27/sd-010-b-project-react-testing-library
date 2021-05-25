import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { queryByText } = renderWithRouter(<About />);
    const aboutText = queryByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    expect(aboutText).toBeInTheDocument();
  });
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { queryByRole } = renderWithRouter(<About />);
    const aboutHeading = queryByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });
  it('Testa se a página contém determinada imagem', () => {
    const { queryByAltText } = renderWithRouter(<About />);
    const pokedexImg = queryByAltText('Pokédex');
    expect(pokedexImg.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
      + '800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
