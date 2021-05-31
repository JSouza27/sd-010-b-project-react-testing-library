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

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const Location = screen.getByRole('heading', {  name: /game locations of pikachu/i});
    expect(Location).toBeInTheDocument();
  });
});
