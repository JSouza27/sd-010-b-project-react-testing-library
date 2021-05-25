import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing the homePage "/"', () => {
  it('should render a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('testa o menu de navegação', () => {
  it('Renderiza o Menu na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Redireciona o usúario para "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it('Redireciona o usúario para "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  it('Redireciona o usúario para "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  it('Redireciona o usúario para "Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/error');
    const notFound = getByText(/not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
