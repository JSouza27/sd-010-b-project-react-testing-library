import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Requisito 3', () => {
  test('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );
    const paragrafo = 'No favorite pokemon found';

    const p1Favorites = screen.getByText(paragrafo);

    expect(p1Favorites).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const { getAllByRole } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const imagem = getAllByRole('img')[0];
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const texto = getByText('No favorite pokemon found');
    expect(texto).toBeInTheDocument();
  });
});
