// Trabalho feito em parceria com Renato
import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Routes', () => {
  it('verifica os links em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();

    history.push('/');

    const textHome = getByText('Home');
    const textAbout = getByText('About');
    const textFavoritePokemons = getByText('Favorite Pokémons');

    expect(textHome).toBeInTheDocument();
    expect(textAbout).toBeInTheDocument();
    expect(textFavoritePokemons).toBeInTheDocument();
  });
  it('renderiza a pagina About ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/About');

    const textHome = getByText('About');

    expect(textHome).toBeInTheDocument();
  });
  it('renderiza a pagina Favorite Pokémons ao clicar no link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/About');

    const textHome = getByText('Favorite Pokémons');

    expect(textHome).toBeInTheDocument();
  });
});
