import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto `Page requested not found 😭`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  test('Teste se página mostra uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const pokemonCryingPikachuImg = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const pokemonCryingPikachuImgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pokemonCryingPikachuImg.src).toBe(pokemonCryingPikachuImgLink);
  });
});
