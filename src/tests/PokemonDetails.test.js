import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const titleDetails = screen.getByRole('heading', {  name: /pikachu details/i})
    expect(titleDetails).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();

    const h2Sumary = screen.getByRole('heading', {  name: /summary/i});
    expect(h2Sumary).toBeInTheDocument();

    const paragraph = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const btnPoison = screen.getByRole('button', {  name: /poison/i})
    userEvent.click(btnPoison);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const Location = screen.getByRole('heading', {  name: /game locations of ekans/i});
    expect(Location).toBeInTheDocument();

    const nameLocation = screen.getByText(/goldenrod game corner/i);
    expect(nameLocation).toBeInTheDocument();

    const mapLocationImg = screen.getByRole('img', {  name: /ekans location/i});
    expect(mapLocationImg).toBeInTheDocument();
    expect(mapLocationImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(mapLocationImg).toHaveAttribute('alt', 'Ekans location');
  });

  it('Teste se o usuário pode favoritar da página de detalhes', () => {
    renderWithRouter(<App />);

    const btnPoison = screen.getByRole('button', {  name: /poison/i})
    userEvent.click(btnPoison);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(favCheckbox).toBeInTheDocument();
  });
});
