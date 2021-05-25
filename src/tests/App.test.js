import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste do primeiro requisito', () => {
  test('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Pokédex');

    expect(home).toBeInTheDocument();
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
});
