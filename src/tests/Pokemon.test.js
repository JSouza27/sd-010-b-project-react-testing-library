import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes na Pokemon.js', () => {
  // https://stackoverflow.com/questions/62151126/how-to-test-html-content-with-react-testing-library
  test('Testando o nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
  });

  test('Testando o tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
  });

  test('Testando o peso correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('Testando a imagem correta do pokémon deve ser mostrado na tela', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const sprite = getByAltText('Pikachu sprite');
    expect(sprite.alt).toMatch('Pikachu sprite');
    expect(sprite.src).toMatch('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(
    'Testando se na Pokédex contém um link de navegação, redirecionamento e id',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkDetails = getByText('More details');
      fireEvent.click(linkDetails);
      expect(history.location.pathname).toBe('/pokemons/25');
    },
  );

  // REcebi o Auxílio do Eder Paiva para entender o que precisava resolver no Stryker
  test('Testando se existe um ícone de estrela', () => {
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
    expect(selection.alt).toMatch('Pikachu is marked as favorite');
  });
});
