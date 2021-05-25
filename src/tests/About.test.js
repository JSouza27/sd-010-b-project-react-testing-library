import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o componente <About />', () => {
  test('Contém um heading h2 comn o texto `About Pokedéx`', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Contém dois parágrafos com o texto sobre Pokedéx', () => {
    renderWithRouter(<About />);

    const paragraphText1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraphText2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphText1).toBeInTheDocument();
    expect(paragraphText2).toBeInTheDocument();
  });

  test('Contém uma imagem especifica', () => {
    renderWithRouter(<About />);

    const logo = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imageAbout = screen.getByRole('img');
    expect(imageAbout).toHaveAttribute('src', logo);
  });
});
