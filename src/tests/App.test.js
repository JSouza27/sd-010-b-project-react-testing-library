import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes na App.js', () => {
  test('Testando a exibição da tela inicial', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });

  test('Testando se os links estão sendo renderizados', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Testando se ao clicar nos links apersenta o conteúdo da página', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    expect(home).toBeInTheDocument();

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    expect(about).toBeInTheDocument();

    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
    expect(favorite).toBeInTheDocument();
  });
  test('Testando a exibição de tela NOT FOUND', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const notFound = '/pageError';
    history.push(notFound);
    const requestedPage = getByText('Page requested not found');
    expect(requestedPage).toBeInTheDocument();
  });
});
