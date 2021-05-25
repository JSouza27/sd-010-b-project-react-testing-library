import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';

import App from '../App';

describe('testa app', () => {
  test('Testa se há um h1 com o texto pokédex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Pokédex/i);
  });

  test('Menu com os links: Home, About e Favorite Pokémons', () => {
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

  test('url inválido renderiza o componente NotFound ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
