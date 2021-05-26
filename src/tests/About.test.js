import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Testing About component', () => {
  it('Test if about page have the pokedex info', () => {
    const { getByText, history } = renderWithRouter(<About />);
    history.push('/about');
    const pokeInfo = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(pokeInfo).toBeInTheDocument();
  });

  it('Test if this page have a heading `About Pokédex`', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const title = getByRole('heading', { level: 2 });
    expect(title.innerHTML).toBe('About Pokédex');
  });

  it('Test if about page have 2 paragrafs', () => {
    const { getByText, history } = renderWithRouter(<About />);
    history.push('/about');
    const pokeInfo = getByText(/One can filter Pokémons by type/i);
    const pokeInfo2 = getByText(/This application simulates a Pokédex/i);
    expect(pokeInfo).toBeInTheDocument();
    expect(pokeInfo2).toBeInTheDocument();
  });

  it('Test if this page have a img of Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const imgOfPokedex = getByRole('img', { name: /Pokédex/i });
    expect(imgOfPokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
