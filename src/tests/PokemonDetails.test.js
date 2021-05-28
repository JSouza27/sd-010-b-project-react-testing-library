import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes na PokemonDetails.js', () => {
  const stringMoreDetails = 'More details';
  const stringPikachuDetails = 'Pikachu Details';
  test('Testando se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(stringMoreDetails);
    fireEvent.click(moreDetails);
    const PikachuDetails = getByRole('heading', {
      level: 2,
      name: stringPikachuDetails,
    });
    expect(PikachuDetails).toBeInTheDocument();
  });

  test(
    'Testando que não deva existir o link para os detalhes do Pokémon selecionado',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const moreDetails = getByText(stringMoreDetails);
      fireEvent.click(moreDetails);
      expect(moreDetails).not.toBeInTheDocument();
    },
  );

  test(
    'A seção de detalhes deve conter um heading h2 com o texto Summary',
    () => {
      const { getByRole, getByText } = renderWithRouter(<App />);
      const moreDetails = getByText(stringMoreDetails);
      fireEvent.click(moreDetails);
      const Summary = getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(Summary).toBeInTheDocument();
    },
  );

  test('Testando se contem um parágrafo com o resumo do Pokémon', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(stringMoreDetails);
    fireEvent.click(moreDetails);
    const paragraph = container.querySelectorAll('pokemon-details');
    console.log(paragraph.querySelectorAll('p'));
    // expect(paragraph.length).toBe(1);
  });
});
