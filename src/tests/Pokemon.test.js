import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

describe('Pokémons', () => {
  test(`Teste se é renderizado um card com
   as informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = screen.getAllByText(/Electric/i);
    expect(type[0]).toBeInTheDocument();
    const weight = screen.getByText(/Average weight: 6.0 kg/i);
    const link = screen.getByText(/More details/i);
    expect(weight).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    const img = screen.getByRole('img');
    const linkImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toEqual(linkImg);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex
   contém um link de navegação`, () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/More details/i);
    expect(link.href).toEqual('http://localhost/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(/More details/i);
    fireEvent.click(link);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });
  test('Favoritos', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/More details/i);
    fireEvent.click(link);
    const fav = screen.getByText(/Pokémon favoritado?/i);
    fireEvent.click(fav);
    const img = screen.getAllByRole('img');
    const linkImg = 'http://localhost/star-icon.svg';
    expect(img[1].src).toEqual(linkImg);
    expect(img[1].alt).toEqual('Pikachu is marked as favorite');
    const type = screen.getByTestId('pokemon-type');
    expect(img[0].alt).toEqual('Pikachu sprite');
    expect(type.innerHTML).toEqual('Electric');
  });
});
