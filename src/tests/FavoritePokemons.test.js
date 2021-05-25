import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// test('', () => {});
describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const rota = '/pokemons/23';
    history.push(rota);
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);

    const rota2 = '/pokemons/143';
    history.push(rota2);
    userEvent.click(favorite);

    const rota3 = '/pokemons/151';
    history.push(rota3);
    userEvent.click(favorite);

    const rota4 = '/favorites';
    history.push(rota4);

    expect(getByText('Ekans')).toBeInTheDocument();
    expect(getByText('Snorlax')).toBeInTheDocument();
    expect(getByText('Mew')).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const rota = '/pokemons/23';
    history.push(rota);
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);

    const rota2 = '/pokemons/143';
    history.push(rota2);
    userEvent.click(favorite);

    const rota3 = '/pokemons/151';
    history.push(rota3);
    userEvent.click(favorite);

    const rota4 = '/favorites';
    history.push(rota4);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
