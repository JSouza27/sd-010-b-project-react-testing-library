import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testing about component', () => {
  it('test the text info about the pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const title = getByRole('heading', {
      level: 2,
    });
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('test the img src', () => {
    const { getByRole } = renderWithRouter(<About />);
    const { src } = getByRole('img');
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
