import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste Favorite Pokemons', () => {
  test('se é exibido na tela No favorite pokemon found,se não tiver favorito.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const phrase = getByText(/No favorite pokemon found/i);
    expect(phrase).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    const favorite = getByText(/Pokémon favoritado?/i);
    userEvent.click(favorite);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePokemons);
    const namePokemon = getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
  test(' se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const frase = getByText(/No favorite pokemon found/i);
    expect(frase).toBeInTheDocument();
  });
});
