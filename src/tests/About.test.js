import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Será avaliado se o arquivo teste About.test.js contemplam 100% 
dos casos de uso criados pelo Stryker`, () => {
  it(`Teste se a página contém as informações sobre a Pokédex, 
  Teste se a página contém um heading h2 com o texto About Pokédex.
  Teste se a página contém dois parágrafos com texto sobre a Pokédex.
  Teste se a página contém a seguinte imagem de uma Pokédex: 
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.
  `, () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const buttonAbout = getByText(/about/i);
    fireEvent.click(buttonAbout);

    const imgAtribute = getByAltText(/pokédex/i);
    const pokedexTitle = getByText(/about pokédex/i);
    const paragraphOne = getByText(/(pokémons by)/i);
    const paragraphTwo = getByText(/(pokédex, a)/i);

    expect(imgAtribute.alt).toBe('Pokédex');
    expect(pokedexTitle.textContent).toBe('About Pokédex');
    expect(paragraphOne.textContent).toMatch('One can filter Pokémons');
    expect(paragraphTwo.textContent).toMatch('This application simulates');
    expect(imgAtribute.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
