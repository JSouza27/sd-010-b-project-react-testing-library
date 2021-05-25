import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Exercicio 4"', () => {
  it('Renderize um h2 com o texto "About Pokédex', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found');
  });

  it('Renderize uma imagem', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getByText((_, { src }) => src === URL)).toBeInTheDocument();
  });
});
