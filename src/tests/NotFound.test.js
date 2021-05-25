import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/page-not-found');
    const noMatch = screen.getByRole(
      'heading', {
        name: /page requested not found/i },
    );
    expect(noMatch).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const getImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(getImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    /* fonte para uso do toHaveAttribute <https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f> */
  });
});
