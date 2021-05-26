import React from 'react';
// import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  // renderiza uma reading() com o texto `Pokédex`
  test('renders a reading with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />); // não entendi o pq o history não passou aqui como na aula ao vivo 15.3
    const heading = getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    // const heading = getByText(/Pokédex/i)
    expect(heading).toBeInTheDocument();
  });
  // verifica o conjunto fixo de links de navegação.
  test('shows the Pokédex when the route is `/Home`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
  });
  test('shows the Pokédex when the route is `/About`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();
  });
  test('shows the Pokédex when the route is `/Favorite`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkFavorite = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });
});
