import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Exercicio 1', () => {
  it('Renderize um h1 com o texto `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Pokédex/i);
  });

  it('Navbar deve obter os textos "Home, About e Favorite Pokémons"', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const navBar = getAllByRole('link');
    expect(navBar[0]).toHaveTextContent('Home');
    expect(navBar[1]).toHaveTextContent('About');
    expect(navBar[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Ao clicar no respectivo link, deve-se redirecionar para sua pagina', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);

    const navBar = getAllByRole('link');

    expect(history.location.pathname).toBe('/');

    fireEvent.click(navBar[0]);
    expect(history.location.pathname).toBe('/');

    fireEvent.click(navBar[1]);
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(navBar[2]);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  it('Ao digitar um url inválido, deve renderizar o componente NotFound ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
