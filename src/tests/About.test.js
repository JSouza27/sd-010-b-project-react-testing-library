import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

// test('', () => {});

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const about = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragrafo = getAllByText(/pokémons/i);
    expect(paragrafo.length).toBe(2);
  });

  // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
