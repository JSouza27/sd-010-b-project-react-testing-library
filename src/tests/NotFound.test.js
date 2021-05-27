import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading'
  + 'h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const not = getByRole('heading', {
      level: 2,
    });
    expect(not).toHaveTextContent('Page requested not found 😭');
  });
  test('Teste se página mostra a imagem', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getByText((_, { src }) => src === url)).toBeInTheDocument();
  });
});
