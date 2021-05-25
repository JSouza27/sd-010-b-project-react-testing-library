import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste requisito1', () => {
  test('Pagina renderizada ao carregar a aplicação no caminho `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Teste se é redirecionada para a página de Pokémons Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/error');
    const notFound = getByText(/not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
