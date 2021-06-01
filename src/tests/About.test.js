import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pageText = getByText('About Pokédex');

    expect(pageText).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const targetHeading = getByRole('heading', { name: /about pokédex/i });

    expect(targetHeading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';
    const secondParagraph = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

    const targetTextOne = getByText(firstParagraph);
    const targetTextTwo = getByText(secondParagraph);

    expect(targetTextOne).toBeInTheDocument();
    expect(targetTextTwo).toBeInTheDocument();
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const targetImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', targetImage);
  });
});
