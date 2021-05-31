import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Requisito 02 = Test o About.js', () => {
  test('Verifica se o titulo \'About Pokédex\' aparece na tela', () => {
    render(<About />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /About pokédex/i, // regex
    })).toBeInTheDocument();
  });

  test('Verifica se os dois parágrafos do About aparece na tela', () => {
    render(<About />);
    let p1 = 'This application simulates a Pokédex, ';
    p1 += 'a digital encyclopedia containing all Pokémons';
    let p2 = 'One can filter Pokémons by type, ';
    p2 += 'and see more details for each one of them';

    expect(screen.getByText(p1, p2)).toBeInTheDocument();
  });

  test('Verifica se a imagem da pokédex aparece Pokédex', () => {
    render(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  // test('Verifica se a imagem aparece na tela', () => {
  //   render(<About />);

  //   expect(screen.getByRole('image', {
  //     name: /pokédex/i,
  //   })).toBeInTheDocument();
  // });
});
