import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testar se a pagina contém', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const textAboutPokemon = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(textAboutPokemon).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const imageAbout = getByRole('img');
    expect(imageAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
