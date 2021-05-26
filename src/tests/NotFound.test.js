import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o arquivo NotFound', () => {
  it('testa se existe a mensagem esperada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');
    const mensagemEsperada = getByText('Page requested not found');
    expect(mensagemEsperada).toBeInTheDocument();
  });

  it('testa se há a imagem esperada', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');
    const altImage = 'Pikachu crying because the page requested was not found';
    const imagemEsperada = getByAltText(altImage);
    expect(imagemEsperada.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
