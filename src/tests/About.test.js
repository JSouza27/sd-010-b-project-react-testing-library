import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente about', () => {
  it('Testa se a página contém um h2 com o valor About Pokédex', () => {
    const { getByRole } = render(<About />);
    const aboutPokedex = getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(aboutPokedex).toBeInTheDocument();

  });
});
