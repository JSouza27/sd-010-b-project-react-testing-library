import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';

describe('Requisiot 2', () => {
  test('', () => {
    let p1 = 'This application simulates a Pokédex, ';
    p1 += 'a digital encyclopedia containing all Pokémons';
    let p2 = 'One can filter Pokémons by type, ';
    p2 += 'and see more details for each one of them';
    render(<About />);

    const headgin = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headgin).toBeInTheDocument();

    expect(screen.getByText(p1)).toBeInTheDocument();
    expect(screen.getByText(p2)).toBeInTheDocument();

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
