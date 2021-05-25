import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando App.js', () => {
  it('Renderiza a página home quando o documento é aberto', () => {
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
});
