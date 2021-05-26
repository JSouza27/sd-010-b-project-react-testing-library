import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Testar o About.js', () => {
  test('Verifica se o titulo aparece na aplicação', () => {
    render(<About />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i, // regex
    })).toBeInTheDocument();
  });

  test('Verifica se há informações sobre a pokedex', () => {
    const { getByText } = render(<About />);

    const textPokedex1 = /This application simulates a Pokédex, a digital encyclopedia/i;
    const textPokedex2 = /One can filter Pokémons by type, and see more details for/i;

    expect(getByText(textPokedex1)).toBeDefined();
    expect(getByText(textPokedex2)).toBeDefined();
  });

  test('Testando se a imagem da pokedex é exibida', () => {
    render(<About />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(logo).toHaveAttribute('alt', 'Pokédex');
  });
});
