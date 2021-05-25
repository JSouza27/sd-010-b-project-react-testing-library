import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente <About />', () => {
  describe('Teste se a página contém as informações sobre a Pokédex.', () => {
    it('Teste se nas informações contém um heading h2 com o texto About Pokédex.', () => {
      const { getByRole } = render(<About />);
      const heading = getByRole('heading', {
        level: 2,
        name: /about pokédex/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('Teste se nas informações contém dois parágrafos com texto sobre a Pokédex.',
      () => {
        const { getByText } = render(<About />);
        let firstParagraph = `This application simulates a Pokédex, a digital
encyclopedia containing all Pokémons`;
        let secondParagraph = `One can filter Pokémons by type, and see more details for
each one of them`;
        firstParagraph = firstParagraph.replace('\n', ' ');
        secondParagraph = secondParagraph.replace('\n', ' ');
        const regexFirstParagraph = RegExp(firstParagraph);
        const regexSecondParagraph = RegExp(secondParagraph);
        const testFirstParagraph = getByText(regexFirstParagraph);
        const testSecondParagraph = getByText(regexSecondParagraph);
        expect(testFirstParagraph).toBeInTheDocument();
        expect(testSecondParagraph).toBeInTheDocument();
      });

    it('Teste se nas informações contém a seguinte imagem de uma Pokédex: <https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png>', () => {
      const { getByRole } = render(<About />);
      const image = getByRole('img');
      // Source: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
      expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
  });
});
