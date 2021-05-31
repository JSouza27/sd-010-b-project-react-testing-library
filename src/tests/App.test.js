import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Requisito 01 = Test App.js', () => {
  test('Renderiza uma leitura com o texto \'Pokédex\'', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Mostra a Pokédex quando a rota é \'/\'', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Teste Redirecionamento para página \'Home \'', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste Redirecionamento para página \'About \'', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste Redirecionamento para página \'Favorites \'', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/Favorite Pokémons/i);
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste Redirecionamento para página \'Not Found \'', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pageNotFound');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
