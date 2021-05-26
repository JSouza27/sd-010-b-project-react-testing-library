import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Requirement03', () => {
  test('Testa se mensagem exibe na tela', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons />);
    history.push('/pagina/que-nao-existe');
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
