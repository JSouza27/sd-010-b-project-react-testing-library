import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Verifica os componentes da pagina pagina FavoritePokemons', () => {
  test('testando a exibição da tela Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('testando a exibição imagem na tela Page requested not found', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const text = 'Pikachu crying because the page requested was not found';
    expect(getByAltText(text)).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
