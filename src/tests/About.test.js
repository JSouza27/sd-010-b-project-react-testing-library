import React from 'react';
import { getAllByRole, getByRole, render } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Teste o componente <About.js /.', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    const historyMock = createMemoryHistory();

    const { getByRole } = render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/about');

    const aboutHeading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const historyMock = createMemoryHistory();

    const { getByText } = render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/about');

    const firstText = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const secondText = 'One can filter Pokémons by type, and see more details for each one of them';
    const firstParagraph = getByText(firstText);
    const secondParagraph = getByText(secondText);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem de uma Pokédex:', () => {
    const historyMock = createMemoryHistory();

    const { getByRole } = render(
      <Router history={ historyMock }>
        <App />
      </Router>
    );

    historyMock.push('/about');

    const image = getByRole('img', {});

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
})
