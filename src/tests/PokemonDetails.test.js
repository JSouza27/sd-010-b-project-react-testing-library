import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 7', () => {
  test('', () => {
    let textPokemon = 'This intelligent Pokémon roasts hard berries ';
    textPokemon += 'with electricity to make them tender enough to eat.';
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(h2).toBeInTheDocument();
    expect(screen.getByText(textPokemon)).toBeInTheDocument();

    expect(screen.getByText('Game Locations of Pikachu')).toBeInTheDocument();
    const images = screen.getAllByAltText('Pikachu location');
    expect(images.length).toBe(2);

    expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();

    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('the user can favorite the Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const label = screen.getByLabelText('Pokémon favoritado?');

    fireEvent.click(label);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();

    fireEvent.click(label);
    expect(screen.queryByAltText('Pikachu is marked as favorite'))
      .not.toBeInTheDocument();
  });
});
