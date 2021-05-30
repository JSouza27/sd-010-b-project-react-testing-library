import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const headingTwo = getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(headingTwo).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const oneP = getByText(/This application simulates a Pokédex,/i);
    const twoP = getByText(/One can filter Pokémons by type,/i);
    expect(oneP).toBeInTheDocument();
    expect(twoP).toBeInTheDocument();
  });

  // Pesquisa nesse site https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
