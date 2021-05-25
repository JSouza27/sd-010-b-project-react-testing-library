import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import NotFound from '../components/NotFound';
// import App from '../App';

describe('Teste NotFuund', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);

    const route = '/pagina-que-nao-existe';
    history.push(route);

    const pageNotFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imG = getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(imG).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
