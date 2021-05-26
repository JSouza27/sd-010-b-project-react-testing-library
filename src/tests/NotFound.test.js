import React from 'react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { getByRole } = renderWithRouter(<NotFound />);
      const heading = getByRole('heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      });
      const cryingEmoji = getByRole('img', { name: 'Crying emoji' });
      expect(heading).toBeInTheDocument();
      expect(cryingEmoji).toBeInTheDocument();
    });

  it('Teste se página mostra a imagem <https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif>', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const pikachuCrying = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(pikachuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
