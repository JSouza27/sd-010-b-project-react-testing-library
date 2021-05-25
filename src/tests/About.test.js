import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import About from '../components/About';

describe('Teste About', () => {
  test('2.1 - Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p = ('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    const phrase = getByText(p);
    expect(phrase).toBeInTheDocument();
  });
  test('2.2 -Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const about = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });
  test('2.3 -Teste se a página contémdois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = ('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    const p2 = ('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const phrase1 = getByText(p1);
    const phrase2 = getByText(p2);
    expect(phrase1).toBeInTheDocument();
    expect(phrase2).toBeInTheDocument();
  });
  test('2.4 - Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagem = getByRole('img');
    expect(imagem).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
