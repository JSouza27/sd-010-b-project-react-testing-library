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
  });
});
