import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando componente NotFound', () => {
  test('Testa se tem titulo na pagina', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });
  test('Testando se mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const alt = getByAltText('Pikachu crying because the page requested was not found');
    // Na documentação entendi o getByAltText pega a teg pela chave alt e o toHaveAttribute verifica se o valor que eu passei esta dentro do src.
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(alt).toHaveAttribute('src', url);
  });
});
