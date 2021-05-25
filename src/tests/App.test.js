import { fireEvent } from '@testing-library/dom';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
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
});
