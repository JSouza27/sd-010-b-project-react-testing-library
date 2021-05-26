import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página principal da Pokédex é renderizada', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('Os links devem ter como texto: Home, About e Favorite Pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const topItens = getAllByRole('link');

    expect(topItens[0]).toHaveTextContent('Home');
    expect(topItens[1]).toHaveTextContent('About');
    expect(topItens[2]).toHaveTextContent('Favorite Pokémons');
  });
});

test('Ao clicar no link Home, é redirecionado para a pagina principal', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App />);
  const topItens = getAllByRole('link');
  const linkElement = getByText(/home/i);

  fireEvent.click(topItens[0]);

  expect(linkElement).toBeInTheDocument();
});

test('Ao clicar no link About, é redirecionado para a pagina Sobre', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App />);
  const topItens = getAllByRole('link');
  const linkElement = getByText(/about/i);

  fireEvent.click(topItens[1]);

  expect(linkElement).toBeInTheDocument();
});

test('Ao clicar no link FP, é redirecionado para a pagina Favoritos', () => {
  const { getAllByRole, getByText } = renderWithRouter(<App />);
  const topItens = getAllByRole('link');
  const linkElement = getByText(/favorite/i);

  fireEvent.click(topItens[2]);

  expect(linkElement).toBeInTheDocument();
});

test('é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/batatinha');

  const pageNotFound = getByText('Page requested not found');
  expect(pageNotFound).toBeInTheDocument();
});
