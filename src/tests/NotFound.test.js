import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

describe('Favorite Page', () => {
  test(`Testa se a página tem um h2 com o texto:
   Page requested not found`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('aleatorio');
    const h2 = getByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
  });

  test('Testa se a página renderiza uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('aleatorio');
    const img = screen.getAllByRole('img');
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img[1].src).toEqual(link);
  });
});
