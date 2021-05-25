import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando App.js', () => {
  it('Renderiza a página home e os links quando o documento é aberto', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    const homeLink = getByText(/Home/i);
    const aboutLink = getByText(/About/i);
    const favoritePokemonsLink = getByText(/Favorite Pokémons/i);

    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('renderiza a página About, quando clicado no link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);

    fireEvent.click(about);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
    expect(about).toBeInTheDocument();
  });

  it('renderiza a página Favorite Pokemons, quando clicado no link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);

    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Renderiza a página Not Found quando entrado em uma URl desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/not/found');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
