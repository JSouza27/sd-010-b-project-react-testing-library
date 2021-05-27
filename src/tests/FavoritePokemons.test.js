import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica os componentes da pagina pagina FavoritePokemons', () => {
  test('Verifica se ao clicar nos links renderisa o conteudo da pagina', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });

  test('Verifica se ao favoritar o pokemoster ele aparece na tela favotite', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  test('testando se nenhum card de pokémon é exibido', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).not.toBeNull();
  });
});
