import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const details = getByRole('heading', { name: 'Pikachu Details' });
    expect(details).toBeInTheDocument();
    const summary = getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();
    expect(getByText(/roasts hard berries/i)).toBeInTheDocument();
  });

  it('Testa se existe seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const gameLocations = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu' });
    expect(gameLocations).toBeInTheDocument();
    const locationList = getAllByAltText('Pikachu location');
    expect(locationList.length).toBe(2);
    expect(locationList[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationList[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
