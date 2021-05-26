// Iniciando o projeto
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />)
    const heading = getByText(/Pokédex/i);
    const { pathname } = history.location;
    expect(pathname).toBe('/')
    expect(heading).toBeInTheDocument();
});
