import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Test requirement01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
  });
  test('Testando se na navegação existe link', () => {
    const { getByText } = renderWithRouter(<App />)
    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavorite = getByText('Favorite Pokémons');
    
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  })
  test('Testa se a aplicação é redirecionada para pagina inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/));
    const pathname = history.location.pathname;

    expect(pathname).toBe('/')
  })
  test('Testa se aplicação redireciona para about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;

    expect(pathname).toBe('/about');
  })
  test('Testa se a aplicação redireciona para Pokemons Favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;

    expect(pathname).toBe('/favorites');
  })
  test('Testa se a aplicação é redirecionada para Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-não-existe/');
    const noMatch = getByText(/not found/i);

    expect(noMatch).toBeInTheDocument();
  });
})
