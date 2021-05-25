import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe(`Será avaliado se o arquivo teste NotFound.test.js contemplam 100% dos 
casos de uso criados pelo Stryker`, () => {
  it(`Teste se página contém um heading h2 com o texto Page requested 
  not found 😭`, () => {
    const { getByText, history } = renderWithRouter(<NotFound />);
    history.push('/notFound');

    const heading = getByText(/page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText(
      /pikachu crying because the page requested was not found/i,
    );

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
