import React from 'react';
import renderWithRouter from '../components/renderWithRouter';

import NotFound from '../components/NotFound';

describe('Testa notFound', () => {
  test('Testa h2 About', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', { level: 2 });
    expect(notFound).toHaveTextContent('Page requested not found');
  });

  test('testa se renderiza imagem do pokemon', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getByText((_, { src }) => src === url)).toBeInTheDocument();
  });
});
