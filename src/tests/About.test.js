import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste requisito 2', () => {
  test('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { queryByText } = renderWithRouter(<About />); // aí já não é mais no APP. E faço a desestruturação aqui pq optei por não usar screen aqui. Mas também poderia usar o screen antes do queryByText na linha abaixo
    expect(queryByText('About Pokédex')).toBeDefined();
  });
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />); // OBS: A Parte abaixo eu fiz com ajuda do meu colega Alexandre Damasceno. Eu tinha feito antes do meu jeito, mas dava erro de Lint e não sabia como resolver.  Link do PR dele: https://github.com/tryber/sd-010-b-project-react-testing-library/pull/83/commits/530e8befe7888550f1751428fa71cca2513ec14f

    const texto1 = 'This application simulates a Pokédex,';
    const texto2 = 'a digital encyclopedia containing all Pokémons';
    const paragraph1 = getByText(`${texto1} ${texto2}`);

    const txt1 = 'One can filter Pokémons by type,';

    const txt2 = 'and see more details for each one of them';
    const paragraph2 = getByText(`${txt1} ${txt2}`);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Testa se a página contém uma imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
