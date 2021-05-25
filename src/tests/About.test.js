import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testando o componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    }));
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const linhas = getAllByText(/Pokémons/i);

    expect(linhas.length).toBe(2);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const urlImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', urlImage);
  });
});
