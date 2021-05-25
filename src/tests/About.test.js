import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente about', () => {
  it('Testa se a página contém um h2 com o valor About Pokédex', () => {
    const { getByRole } = render(<About />);
    const aboutPokedex = getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const paragraph1 = getByText(/This application simulates/i);
    const paragraph2 = getByText(/One can filter Pokémons by/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem da Pokédex', () => {
    const { getByRole } = render(<About />);
    const pokedexImage = getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});
