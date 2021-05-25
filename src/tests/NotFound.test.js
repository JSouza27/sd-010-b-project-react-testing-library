import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa NotFound page', () => {
  it(`Testa se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
    const { history, queryByRole } = renderWithRouter(<App />);
    history.push('/url-não-existente');
    const notFound = queryByRole('heading', {
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
    expect(notFound.innerHTML)
      .toBe(
        'Page requested not found<span role="img" aria-label="Crying emoji"> 😭</span>',
      );
  });
  it('Testa se a página contém determinada imagem', () => {
    const { queryByAltText, history } = renderWithRouter(<App />);
    history.push('/url-não-existente');
    const notFoundImg = queryByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImg.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
