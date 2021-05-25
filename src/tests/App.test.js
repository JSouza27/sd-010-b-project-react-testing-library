import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do requisito 1', () => {
  it("Deve renderizar o componente no caminho '/' ", () => {
    const { history } = renderWithRouter(<App />);
    const pathname = history.location.pathname;

    expect(pathname).toBe('/');  
  });

  it('Verifica se há um conjunto de links', () => {
    const { getByRole } = renderWithRouter(<App />);
    
    const firstLink = getByRole('link', {
      name: 'Home',
    });
    const secondLink = getByRole('link', {
      name: 'About',
    });
    const thirdLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });  
   
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  })

  it('Verifica se a aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />)

    fireEvent.click(getByText(/home/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  })

  it('Verifica se a aplicação é redirecionada para a página de About ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />)

    fireEvent.click(getByText(/about/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  })

  it('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados ao clicar no link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />)

    fireEvent.click(getByText(/favorite pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  })

  it('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);

    history.push('/nao-existe');
    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
  })

})
