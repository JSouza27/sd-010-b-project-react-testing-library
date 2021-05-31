import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

const newLocal = '/pokemons/25';
describe('Requisito 07 = PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(newLocal);
    // history.push('/pokemons/25');
    let textPokemon = 'This intelligent Pokémon roasts hard berries ';
    textPokemon += 'with electricity to make them tender enough to eat.';

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(h2).toBeInTheDocument();
    expect(screen.getByText(textPokemon)).toBeInTheDocument();
  });

  test('Teste seção com os mapas contendo as localizações do pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push(newLocal);

    expect(screen.getByText('Game Locations of Pikachu')).toBeInTheDocument();
    const images = screen.getAllByAltText('Pikachu location');
    expect(images.length).toBe(2);

    expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();

    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon pela página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(newLocal);

    const label = screen.getByLabelText('Pokémon favoritado?');

    fireEvent.click(label);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();

    fireEvent.click(label);
    expect(screen.queryByAltText('Pikachu is marked as favorite'))
      .not.toBeInTheDocument();
  });
});
