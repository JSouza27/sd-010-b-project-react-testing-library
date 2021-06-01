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
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(stringMoreDetails);
    fireEvent.click(moreDetails);
    const paragraph = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );
    expect(paragraph).toBeInTheDocument();
  });

  test(
    'Teste se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
      const moreDetails = getByText(stringMoreDetails);
      fireEvent.click(moreDetails);
      const Summary = getByRole('heading', {
        level: 2,
        name: 'Game Locations of Pikachu',
      });
      expect(Summary).toBeInTheDocument();
      const habitat = getAllByAltText('Pikachu location');
      expect(habitat).toHaveLength(2);
      expect(habitat[0].src).toMatch('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(habitat[1].src).toMatch('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    },
  );

  test(
    'testando se o usuário pode favoritar um pokémon através da página de detalhes. ',
    () => {
      const { getByRole, getByAltText, history } = renderWithRouter(<App />);
      const moreDetails = getByRole('link', {
        name: 'More details',
      });
      fireEvent.click(moreDetails);
      const { location: { pathname } } = history;
      const pikachuRoute = '/pokemons/25';
      expect(pathname).toBe(pikachuRoute);
      const favorite = getByRole('checkbox', {
        name: 'Pokémon favoritado?',
      });
      fireEvent.click(favorite);
      const selection = getByAltText('Pikachu is marked as favorite');
      expect(selection.src).toMatch('/star-icon.svg');
      fireEvent.click(favorite);
      expect(selection.alt).not.toMatch('Pikachu sprite');
    },
  );
});
