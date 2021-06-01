import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testando App', () => {
  test('Testar se a um H1 com o texto pokedex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Pokédex/i);
  });
  test('Testando menu de links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const menu = getAllByRole('link');
    expect(menu[0]).toHaveTextContent('Home');
    expect(menu[1]).toHaveTextContent('About');
    expect(menu[2]).toHaveTextContent('Favorite Pokémons');
  });
  test('Ao clicar no link redireciona a pagina', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    const menu = getAllByRole('link');
    expect(history.location.pathname).toBe('/');
    fireEvent.click(menu[0]);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(menu[1]);
    expect(history.location.pathname).toBe('/about');
    fireEvent.click(menu[2]);
    expect(history.location.pathname).toBe('/favorites');
    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
  test('Url invalida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
