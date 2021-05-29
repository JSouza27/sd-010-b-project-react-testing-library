import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe(`Teste se é renderizado um card
  com as informações de determinado pokémon`, () => {
  test('Verificar se é renderizado o nome do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const nomePokemon = screen.getByText('Pikachu');

    expect(nomePokemon).toBeInTheDocument();
  });

  test('Verificar se é renderizado o tipo do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
  });

  test('Verificar se é renderizado o peso do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const averageWeightPokemon = screen.getByText('Average weight: 6.0 kg');

    expect(averageWeightPokemon).toBeInTheDocument();
  });

  test('Testando a imagem correta do pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const spritePokemon = screen.getByAltText('Pikachu sprite');
    expect(spritePokemon.alt).toBe('Pikachu sprite');
    expect(spritePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
